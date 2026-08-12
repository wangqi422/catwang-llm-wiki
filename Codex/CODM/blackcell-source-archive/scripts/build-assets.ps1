param(
    [Parameter(Mandatory = $true)][string]$SourceRoot,
    [string]$ProjectRoot
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

if ([string]::IsNullOrWhiteSpace($ProjectRoot)) {
    $scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path
    $ProjectRoot = Split-Path -Parent $scriptDirectory
}

$resolvedSource = (Resolve-Path -LiteralPath $SourceRoot).Path
$resolvedProject = (Resolve-Path -LiteralPath $ProjectRoot).Path
$localDir = Join-Path $resolvedProject 'assets\local'
$thumbDir = Join-Path $resolvedProject 'assets\thumbs'
$jsDir = Join-Path $resolvedProject 'js'
New-Item -ItemType Directory -Force -Path $localDir, $thumbDir, $jsDir | Out-Null

$officialBlog = 'https://www.callofduty.com/blog/2023/12/call-of-duty-modern-warfare-III-warzone-season-1-blackcell-battle-pass-bundles'
$officialVideo = 'https://www.youtube.com/watch?v=CTDdmSbGT_k'

$timestamps = @{
    'asset-008' = '00:27.50'
    'asset-009' = '00:13.20'
    'asset-010' = '00:20.40'
    'asset-011' = '00:10.90'
    'asset-012' = '00:30.60'
    'asset-013' = '00:30.60'
    'asset-014' = '00:10.50'
    'asset-015' = '00:31.80'
    'asset-016' = '00:31.20'
    'asset-017' = '00:10.50'
    'asset-018' = '00:20.50'
    'asset-019' = '00:20.40'
    'asset-020' = '00:27.80'
    'asset-021' = '00:31.20'
    'asset-022' = '00:32.30'
    'asset-023' = '00:32.30'
    'asset-024' = '00:30.60'
    'asset-025' = '00:14.80'
}
$posterIds = @('asset-002','asset-005','asset-026','asset-027','asset-028')
$derivedIds = @('asset-001','asset-003','asset-004','asset-006','asset-030')
function New-Thumbnail {
    param([string]$InputPath, [string]$OutputPath)
    $source = [System.Drawing.Image]::FromFile($InputPath)
    try {
        $targetWidth = [Math]::Min(640, $source.Width)
        $targetHeight = [Math]::Max(1, [int][Math]::Round($source.Height * ($targetWidth / $source.Width)))
        $bitmap = New-Object System.Drawing.Bitmap $targetWidth, $targetHeight
        try {
            $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
            try {
                $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $graphics.DrawImage($source, 0, 0, $targetWidth, $targetHeight)
                $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
            } finally { $graphics.Dispose() }
        } finally { $bitmap.Dispose() }
    } finally { $source.Dispose() }
}

$sourceFiles = @(Get-ChildItem -LiteralPath $resolvedSource -Recurse -File | Where-Object {
    $_.Extension.ToLowerInvariant() -in @('.jpg', '.jpeg', '.png')
} | Sort-Object FullName)

if ($sourceFiles.Count -ne 30) {
    throw "Expected exactly 30 input images, found $($sourceFiles.Count)"
}

$assets = @()
$primaryByHash = @{}
for ($index = 0; $index -lt $sourceFiles.Count; $index++) {
    $file = $sourceFiles[$index]
    $id = 'asset-{0:d3}' -f ($index + 1)
    $extension = $file.Extension.ToLowerInvariant()
    $localName = "$id$extension"
    $thumbName = "$id.jpg"
    $localPath = Join-Path $localDir $localName
    $thumbPath = Join-Path $thumbDir $thumbName
    Copy-Item -LiteralPath $file.FullName -Destination $localPath -Force
    New-Thumbnail -InputPath $file.FullName -OutputPath $thumbPath

    $image = [System.Drawing.Image]::FromFile($file.FullName)
    try { $width = $image.Width; $height = $image.Height } finally { $image.Dispose() }
    $hash = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash

    $name = $file.Name
    $status = 'unverified'
    $category = 'reference'
    $confidence = 0.62
    $evidence = 'Visual content belongs to the same BlackCell Season 1 collection, but an exact official frame or page has not been confirmed.'
    $officialUrl = $null
    $videoTimestamp = $null
    $learningValue = 'Use as a supporting reference only; do not let it override verified camera, identity, or layout sources.'

    if ($timestamps.ContainsKey($id)) {
        $status = 'official_video_frame'
        $category = 'video-frame'
        $confidence = 0.86
        $evidence = "Perceptual match against the official 41.15-second Season 1 BlackCell trailer near $($timestamps[$id])."
        $officialUrl = $officialVideo
        $videoTimestamp = $timestamps[$id]
        $learningValue = 'Study camera height, body direction, weapon foreground, blocking, and real environmental depth.'
    } elseif ($posterIds -contains $id) {
        $status = 'official_poster'
        $category = 'poster'
        $confidence = 0.9
        $evidence = 'Campaign key art or reward presentation associated with the official MWIII Season 1 BlackCell release.'
        $officialUrl = $officialBlog
        $learningValue = 'Study Abolisher identity, black-gold material hierarchy, headline scale, and reward-grid structure.'
    } elseif ($derivedIds -contains $id) {
        $status = 'derived_layout'
        $category = 'layout'
        $confidence = 0.84
        $evidence = 'A screenshot or explainer layout built from the same official BlackCell campaign imagery.'
        $officialUrl = $officialBlog
        $learningValue = 'Study information density cautiously; treat the official campaign page as the authoritative layout source.'
    }

    $duplicateOf = $null
    if ($primaryByHash.ContainsKey($hash)) {
        $status = 'duplicate'
        $category = 'duplicate'
        $confidence = 1.0
        $duplicateOf = $primaryByHash[$hash]
        $evidence = "SHA-256 is identical to $duplicateOf."
        $learningValue = 'No additional visual evidence; retained to preserve the complete source-folder inventory.'
    } else {
        $primaryByHash[$hash] = $id
    }

    $assets += [ordered]@{
        id = $id
        fileName = $name
        originalRelativePath = $file.FullName.Substring($resolvedSource.Length).TrimStart('\')
        localPath = "assets/local/$localName"
        thumbnailPath = "assets/thumbs/$thumbName"
        width = $width
        height = $height
        category = $category
        sourceStatus = $status
        confidence = $confidence
        evidence = $evidence
        officialUrl = $officialUrl
        videoTimestamp = $videoTimestamp
        duplicateOf = $duplicateOf
        learningValue = $learningValue
        sha256 = $hash
    }
}

$json = $assets | ConvertTo-Json -Depth 5
$output = "window.BLACKCELL_ASSETS = $json;`n"
Set-Content -LiteralPath (Join-Path $jsDir 'assets-data.js') -Value $output -Encoding UTF8
Write-Output "Built $($assets.Count) assets from $resolvedSource"


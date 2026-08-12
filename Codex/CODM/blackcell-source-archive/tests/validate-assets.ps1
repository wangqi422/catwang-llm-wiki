param(
    [string]$ProjectRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
$dataPath = Join-Path $ProjectRoot 'js\assets-data.js'
if (-not (Test-Path -LiteralPath $dataPath)) {
    throw "Missing asset data: $dataPath"
}

$raw = Get-Content -Raw -Encoding UTF8 -LiteralPath $dataPath
$json = $raw -replace '^\s*window\.BLACKCELL_ASSETS\s*=\s*', '' -replace ';\s*$', ''
$parsedAssets = $json | ConvertFrom-Json
$assets = @($parsedAssets)
$validStates = @('official_video_frame', 'official_poster', 'derived_layout', 'duplicate', 'unverified')

if ($assets.Count -ne 30) { throw "Expected 30 assets, got $($assets.Count)" }
if (($assets | Where-Object sourceStatus -eq 'duplicate').Count -ne 2) {
    throw "Expected 2 duplicate records"
}
if (($assets | Group-Object id).Count -ne 30) { throw 'Asset IDs are not unique' }

foreach ($asset in $assets) {
    foreach ($field in @('id','fileName','localPath','thumbnailPath','width','height','category','sourceStatus','confidence','evidence','learningValue')) {
        if ($null -eq $asset.$field -or [string]::IsNullOrWhiteSpace([string]$asset.$field)) {
            throw "Missing $field on $($asset.id)"
        }
    }
    if (-not (Test-Path -LiteralPath (Join-Path $ProjectRoot $asset.localPath))) {
        throw "Missing local file: $($asset.fileName)"
    }
    if (-not (Test-Path -LiteralPath (Join-Path $ProjectRoot $asset.thumbnailPath))) {
        throw "Missing thumbnail: $($asset.fileName)"
    }
    if ($asset.width -le 0 -or $asset.height -le 0) { throw "Invalid dimensions: $($asset.fileName)" }
    if ($validStates -notcontains $asset.sourceStatus) { throw "Invalid source state: $($asset.sourceStatus)" }
    if ($asset.confidence -lt 0 -or $asset.confidence -gt 1) { throw "Invalid confidence: $($asset.fileName)" }
    if ($asset.sourceStatus -eq 'official_video_frame' -and [string]::IsNullOrWhiteSpace([string]$asset.videoTimestamp)) {
        throw "Official video frame lacks timestamp: $($asset.fileName)"
    }
    if ($asset.sourceStatus -eq 'official_poster' -and [string]::IsNullOrWhiteSpace([string]$asset.officialUrl)) {
        throw "Official poster lacks source URL: $($asset.fileName)"
    }
    if ($asset.sourceStatus -eq 'duplicate' -and [string]::IsNullOrWhiteSpace([string]$asset.duplicateOf)) {
        throw "Duplicate lacks primary record: $($asset.fileName)"
    }
}

Write-Output 'PASS: 30 assets, 30 thumbnails, 2 duplicate records'


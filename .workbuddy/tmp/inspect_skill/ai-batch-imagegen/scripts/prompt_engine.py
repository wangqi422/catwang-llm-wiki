# -*- coding: utf-8 -*-
"""提示词引擎 — 从 components.yaml 随机组装结构不重复的提示词 (零 token)。
core() 给 woa 用(纯自然语言); mj() 给 MJ 用(加 --ar/--s)。
自检: python prompt_engine.py --sample 5
"""
import os, yaml, random, argparse

HERE = os.path.dirname(os.path.abspath(__file__))


class PromptEngine:
    def __init__(self, components="components.yaml", seed=None):
        with open(os.path.join(HERE, components), encoding="utf-8") as f:
            self.c = yaml.safe_load(f)
        self.rng = random.Random(seed)
        self.low_kw = self.c.get("low_weight_keywords", []) or []

    def _pick(self, key):
        pool = self.c.get(key) or [""]
        return self.rng.choice(pool)

    def _pick_weighted(self, key):
        """命中低权重关键词时 60% 概率重抽一次。"""
        v = self._pick(key)
        if self.low_kw and any(k in v for k in self.low_kw) and self.rng.random() < 0.6:
            v = self._pick(key)
        return v

    def core(self):
        mood = self._pick("mood_base")
        scene = self._pick_weighted("scenes")
        palette = self._pick_weighted("palette")  # 修正: yaml 用单数 palette
        shot = self._pick("shots")
        parts = [mood, scene, palette, shot]

        extra = self._pick("extra_modifiers")
        if extra:
            parts.append(extra)

        # 物体: 50% 不加 / 30% 加1 / 20% 加2
        objs_pool = self.c.get("objects") or []
        r = self.rng.random()
        if objs_pool and r > 0.5:
            n = 1 if r < 0.8 else 2
            objs = self.rng.sample(objs_pool, min(n, len(objs_pool)))
            parts.append("featuring " + " and ".join(objs))

        parts.append(self.c.get("quality", ""))
        return ". ".join(p for p in parts if p).strip()

    def aspect(self):
        return self.rng.choice(self.c.get("aspect_pool", ["16:9"]))

    def mj(self, stylize=80, version=""):
        s = f"{self.core()} --ar {self.aspect()} --s {stylize}"
        return f"{s} {version}".strip()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sample", type=int, default=5)
    ap.add_argument("--mode", default="mj", choices=["mj", "woa"])
    a = ap.parse_args()
    e = PromptEngine()
    for i in range(a.sample):
        print(f"[{i+1}] {e.mj() if a.mode == 'mj' else e.core()}\n")


if __name__ == "__main__":
    main()

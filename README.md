# LifeForge · 生命游戏锻造炉

<p align="center">
  <a href="https://github.com/CJX0712/life-forge/actions/workflows/ci.yml"><img src="https://github.com/CJX0712/life-forge/actions/workflows/ci.yml/badge.svg" alt="ci"></a>
  <a href="https://github.com/CJX0712/life-forge/releases"><img src="https://img.shields.io/github/v/release/CJX0712/life-forge?sort=semver" alt="release"></a>
  <a href="https://github.com/CJX0712/life-forge/blob/main/LICENSE"><img src="https://img.shields.io/github/license/CJX0712/life-forge" alt="license"></a>
  <img src="https://img.shields.io/badge/author-%E6%99%A8%E6%98%9F-1f6feb" alt="author">
</p>

单文件离线运行的康威生命游戏（Conway's Game of Life）实验台。标准 **B3/S23** 规则、环面（toroidal）边界、确定性种子、内置经典图案库与一键自检。

> 同一个种子永远生成同一片混沌宇宙；同一个图案永远演化出同一段生命周期。

## 功能

- **播放 / 单步 / 清空 / 随机**，速度可调（1–60 代/秒）
- **经典图案库**：方块（静物）、闪烁器（周期 2）、滑翔机、蟾蜍、信标、脉冲星（周期 3）
- **确定性种子**：输入任意文字/数字 + 密度，LCG 生成可复现的随机宇宙
- **实时状态**：世代、存活细胞数
- **内置自检**：浏览器内一键验证引擎规则正确性（8 项不变量）

## 引擎规则

每个细胞下一世代的存活由周围 8 邻域决定（环面边界，跨边相连）：

| 当前状态 | 邻域存活数 | 下一世代 |
|---------|-----------|---------|
| 存活     | 2 或 3     | 存活     |
| 存活     | 其他       | 死亡     |
| 死亡     | 3          | 存活     |
| 死亡     | 其他       | 死亡     |

## 算法验证（无头）

引擎逻辑抽离为纯函数，`_smoke.js` 在 Node 下做不变量校验，**10/10 全绿**：

- 方块静物：1 代后存活数不变（4→4）
- 闪烁器：周期 2（2 代复原）
- 滑翔机：4 代后向右平移一格、保持 5 细胞
- 空白网格：永远为空
- 确定性：同种子→同宇宙；异种子→异宇宙
- 脉冲星：精确 48 细胞、周期 3
- 混沌宇宙：100×100 跑 200 代无崩溃、种群稳定有界

```bash
node _smoke.js      # 引擎不变量测试
node _probe.js      # 生成可读图案样例到 _probe.txt
```

## 使用

直接用浏览器打开 `index.html` 即可，零外部依赖、可离线运行。

## 许可

MIT — 见 [LICENSE](LICENSE)。

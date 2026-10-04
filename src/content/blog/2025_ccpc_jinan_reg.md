---
title: "2025 CCPC Jinan reg review"
description: "2026_10_04 训练赛复盘总结"
pubDate: 2026-10—04
tags: ["ACM","算法竞赛"，"比赛复盘"]
featured: true
---

## 比赛情况
这次比赛总共过了两道题（C,K），这是*last dance*的第一次配合训练赛，配合方面有很大问题。主要是交流方面效率比较低，在读题的过程中应该是一个人先读完题目然后用简单易懂的话给另一个人复述清楚，这样能够降低两个人重复读同一道题目的时间，从而能把更多时间花在思考解法上，另一个就是尽量输出有用的发现。

## 补题
### A 密码

### C 寻找关键词

### E 树与子树问题

### F 网格填充游戏

### K 卡牌游戏

### L 活动排练
题目大意（先把过程看懂）
有 $n$ 个学生排成一队，每人一张牌，牌上的数字是 $1\sim n$ 的一个排列。
一次"比较活动"要跑 $n-1$ 轮，每轮：
1. 取队首的两个人出来比较；
2. 数字大的被"选中"（记录下来，然后永远退场）；
3. 数字小的回到队尾。
重复 $n-1$ 轮后，一共选中 $n-1$ 个人（最后剩下的那块牌子一定是全场最小的 $1$）。
有两种操作：
- C x y：交换第 $x$ 个和第 $y$ 个学生的牌；
- A l r：跑一次比较活动，输出第 $l$ 轮到第 $r$ 轮被选中的数字之和。
样例：$a=[4,3,1,2,5]$
轮次	队首两张	选中	去队尾
1	4,3	4	3
2	1,2	2	1
3	5,3	5	3
4	1,3	3	1
选中序列是 $[4,2,5,3]$。所以 A 3 4 = $5+3=8$。
核心观察：用一个"加长数组"描述整个过程
给每张牌一个编号：
- 初始第 $i$ 个位置上的牌，编号就是 $i$；
- 第 $i$ 轮被扔到队尾的那张牌，编号记为 $n+i$。
关键结论：可以证明，在第 $i$ 轮开始前，队伍里的牌恰好是编号
$$2i-1,\ 2i,\ 2i+1,\ \dots,\ n+i-1$$
按顺序排成一列。也就是说队首始终是 $2i-1$ 和 $2i$。
于是：
$$\text{选中}_i=\max(a_{2i-1},\,a_{2i}),\qquad a_{n+i}=\min(a_{2i-1},\,a_{2i}).$$
直觉：把 $a$ 数组加长到 $2n-1$，第 $n+i$ 个位置存的就是"第 $i$ 轮被扔到队尾的那个较小值"。
用样例验证（$n=5$）：
- $a_6=\min(a_1,a_2)=\min(4,3)=3$，第 1 轮选中 $\max=4$ ✓
- $a_7=\min(a_3,a_4)=\min(1,2)=1$，第 2 轮选中 $2$ ✓
- $a_8=\min(a_5,a_6)=\min(5,3)=3$，第 3 轮选中 $5$ ✓
- $a_9=\min(a_7,a_8)=\min(1,3)=1$，第 4 轮选中 $3$ ✓
完全吻合。
再观察：这其实是一棵"树"
把 $a_{n+i}$ 看作一个内部结点，它的两个孩子是 $2i-1$ 和 $2i$：
a_9 = min(a_7, a_8)
      ├── a_7 = min(a_3, a_4)
      └── a_8 = min(a_5, a_6)
                 └── a_6 = min(a_1, a_2)
这是一棵 min 锦标赛树：每个内部结点存两个孩子的最小值，根 $a_{2n-1}$ 就是全场最小值 $1$。
反过来，结点 $p$ 的父亲是谁？它是某一轮的 $2i-1$ 或 $2i$，即 $i=\lceil p/2\rceil$，所以
$$\text{parent}(p)=n+\left\lceil \frac{p}{2}\right\rceil .$$
这棵树的高度是 $O(\log n)$（从叶子 $p$ 往上，编号约等于 $n+p/2\to1.5n\to1.75n\to\dots\to2n$，很快到根）。
修改操作怎么处理
C x y 只是交换两个叶子的值。交换后，只要沿着 $x$ 和 $y$ 的父亲链一路往上重算：
- 每个内部结点重算它的：
- min 值（给父亲用），
- max 值（这就是该轮被选中的数字）。
因为树高 $O(\log n)$，一次交换只影响 $O(\log n)$ 个结点。
重要：每个内部结点 $n+i$ 的 max 值，正好就是第 $i$ 轮被选中的数字！
所以我们再开一个数组
$$B_i=\max(a_{2i-1},a_{2i}) \quad(\text{第 }i\text{ 轮选中的数字}),$$
用一个树状数组（或线段树）维护 $B$，支持单点修改和区间求和。
查询操作怎么处理
A l r 的答案就是
$$\sum_{i=l}^{r} B_i .$$
树状数组前缀和相减即可，$O(\log n)$。
也可以写成 $\sum(a_{2i-1}+a_{2i})-\sum a_{n+i}$，但直接用 $B$ 最省事。
复杂度
- 每次 C：向上重算 $O(\log n)$ 个结点，每个结点改树状数组 $O(\log n)$，共 $O(\log^2 n)$。
- 每次 A：$O(\log n)$。
总复杂度 $O(n + m\log^2 n)$，可以过 $n,m\le10^5$。
参考代码（C++）
```c++
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;

    int N = 2 * n;                 // 用到下标 1 .. 2n-1
    vector<int> a(N, 0);
    for (int i = 1; i <= n; ++i) cin >> a[i];

    vector<int> B(n, 0);           // B[i] = 第 i 轮选中的数字
    for (int i = 1; i <= n - 1; ++i) {
        int c1 = 2 * i - 1, c2 = 2 * i;
        a[n + i] = min(a[c1], a[c2]);   // 内部结点 = min
        B[i]     = max(a[c1], a[c2]);   // 选中值     = max
    }

    // 树状数组维护 B 的区间和
    vector<long long> bit(n + 1, 0);
    auto add = [&](int i, long long d) {
        for (; i <= n - 1; i += i & -i) bit[i] += d;
    };
    auto pref = [&](int i) {
        long long s = 0;
        for (; i > 0; i -= i & -i) s += bit[i];
        return s;
    };
    for (int i = 1; i <= n - 1; ++i) add(i, B[i]);

    auto recompute = [&](int p) {   // 重算内部结点 p = n + i
        int i = p - n;
        int c1 = 2 * i - 1, c2 = 2 * i;
        int mn = min(a[c1], a[c2]);
        int mx = max(a[c1], a[c2]);
        a[p] = mn;
        add(i, (long long)mx - B[i]);   // 把 B[i] 改成 mx
        B[i] = mx;
    };

    auto update = [&](int x) {      // 叶子 x 变了，沿父亲链往上重算
        int root = 2 * n - 1;
        while (x != root) {
            int p = n + (x + 1) / 2;    // ceil(x/2) = (x+1)/2
            recompute(p);
            x = p;
        }
    };

    while (m--) {
        char op; int x, y;
        cin >> op >> x >> y;
        if (op == 'C') {
            swap(a[x], a[y]);
            update(x);
            update(y);
        } else {                    // 'A' : 答案 = B[l] + ... + B[r]
            cout << pref(y) - pref(x - 1) << '\n';
        }
    }
    return 0;
}
```
一句话总结
把每轮"扔到队尾的小值"存成 $a_{n+i}=\min(a_{2i-1},a_{2i})$，整个比较过程就变成了一棵高 $O(\log n)$ 的 min 锦标赛树；每轮选中的数就是内部结点的 max。交换只需更新两条叶子到根的路径（$O(\log n)$ 个点），再用树状数组维护 max 数组做区间和即可。
如果你想，我可以再带你把样例逐步用这套"树 + 树状数组"手动走一遍，帮助加深印象。
Build · DeepSeek V4.1 Flash · 54.0s · 242.2 tok/s
Build·DeepSeek V4.1 FlashDeepSeek·low
~

import { useMemo, useState } from "react";

export default function ClassicalPieceQuiz() {
const results = {
  clair_de_lune: {
    title: "你是《月光》",
    composer: "德彪西 Claude Debussy",
    era: "印象派",
    emoji: "🌙",
    avatar:"/avatars/debussy.png",
    color: "from-slate-900 via-indigo-900 to-blue-950",
    tags: ["安静", "细腻", "感受力强", "有一点疏离"],
    description:
      "你不一定总是最热闹的那个人，但你很有自己的节奏。你敏感、会观察，也很容易被气氛和细节打动。外表平静，内里其实有很多层情绪。",
    vibe:
      "适合深夜、雨天、一个人走路、或者把耳机声音开得刚刚好的时刻。",
    recommendation: "如果你喜欢这首，也可以试试《梦幻曲》与《Gymnopédie No.1》。",
    audio: "/audio/clair_de_lune.mp3",
  },

  spring: {
    title: "你是《四季・春》",
    composer: "维瓦尔第 Antonio Vivaldi",
    era: "巴洛克",
    emoji: "🌿",
    avatar:"/avatars/vivaldi.png",
    color: "from-emerald-500 via-lime-400 to-yellow-500",
    tags: ["有活力", "外向", "行动派", "感染力强"],
    description:
      "你带着一种很自然的生命力。你不喜欢一直停在原地，更喜欢开始、尝试、推进。你往往能让身边的人也跟着动起来。",
    vibe:
      "适合晴天、出门、开始新计划、或者刚下定决心改变自己的时候。",
    recommendation: "如果你喜欢这首，也可以试试《小夜曲》与《G弦上的咏叹调》。",
    audio: "/audio/spring.mp3",
  },

  fifth: {
    title: "你是《命运交响曲》",
    composer: "贝多芬 Ludwig van Beethoven",
    era: "古典主义 / 浪漫主义过渡",
    emoji: "⚡",
    avatar:"/avatars/beethoven.png",
    color: "from-zinc-900 via-neutral-800 to-stone-700",
    tags: ["意志强", "不服输", "有压迫感", "能扛事"],
    description:
      "你不是轻飘飘的人。你身上有一种‘就算困难也要往前’的力量。别人可能觉得你有点强势，但你其实只是很认真地对待自己的人生。",
    vibe: "适合迎战压力、咬牙坚持、重新振作的时候。",
    recommendation: "如果你喜欢这首，也可以试试《英雄交响曲》与《火鸟》组曲。",
    audio: "/audio/symphony_No.5.mp3",
  },

  canon: {
    title: "你是《卡农》",
    composer: "帕赫贝尔 Johann Pachelbel",
    era: "巴洛克",
    emoji: "🕊️",
    avatar:"/avatars/pachelbel.png",
    color: "from-amber-700 via-orange-700 to-rose-700",
    tags: ["温柔", "稳定", "有陪伴感", "容易被依赖"],
    description:
      "你给人的感觉是舒服和安心。也许你不一定是最锋利的那种类型，但你很稳，也很适合长期关系。很多人会在你身边放松下来。",
    vibe:
      "适合午后、婚礼、慢慢聊天、和那些不需要刻意用力的关系。",
    recommendation: "如果你喜欢这首，也可以试试巴赫《G弦上的咏叹调》。",
    audio: "/audio/canon.mp3",
  },

  lacrimosa: {
    title: "你是《Lacrimosa》",
    composer: "莫扎特 Wolfgang Amadeus Mozart",
    era: "古典主义",
    emoji: "🕯️",
    avatar:"/avatars/Mozart.png",
    color: "from-slate-800 via-slate-700 to-gray-500",
    tags: ["共情力高", "深沉", "记忆感强", "情绪浓"],
    description:
      "你很会感受，也很难真正‘无所谓’。你对很多事情都不是表面接受，而是会放进心里慢慢消化。你的深度，会让真正懂你的人很珍惜。",
    vibe:
      "适合回忆、遗憾、沉思，以及那些无法轻易说出口的情绪。",
    recommendation: "如果你喜欢这首，也可以试试《Adagio for Strings》或《天鹅》。",
    audio: "/audio/lacrimosa.mp3",
  },

  turkish_march: {
    title: "你是《土耳其进行曲》",
    composer: "莫扎特 Wolfgang Amadeus Mozart",
    era: "古典主义",
    emoji: "🎹",
    avatar:"/avatars/Mozart.png",
    color: "from-pink-400 via-rose-400 to-orange-300",
    tags: ["机灵", "节奏感强", "有趣", "不喜欢无聊"],
    description:
      "你反应快，脑子转得也快。你通常不喜欢拖泥带水，更偏好轻快、直接、有趣的交流方式。你很容易成为气氛里的亮点。",
    vibe:
      "适合聚会、聊天、短视频、和脑袋灵光一闪的时候。",
    recommendation: "如果你喜欢这首，也可以试试《小星星变奏曲》。",
    audio: "/audio/turkish_march.mp3",
  },
};

  const questions = [
    {
      id: 1,
      text: "周末终于空下来，你更想怎么度过？",
      options: [
        { text: "一个人安静待着，听点东西", weights: { clair_de_lune: 2, lacrimosa: 1 } },
        { text: "立刻出门，见人，感受天气", weights: { spring: 2, turkish_march: 1 } },
        { text: "把积压的事一口气做完", weights: { fifth: 2 } },
        { text: "和喜欢的人慢慢吃饭聊天", weights: { canon: 2, clair_de_lune: 1 } },
      ],
    },
    {
      id: 2,
      text: "你更容易被哪种人吸引？",
      options: [
        { text: "安静但很有故事的人", weights: { clair_de_lune: 2, lacrimosa: 1 } },
        { text: "有生命力、很明亮的人", weights: { spring: 2 } },
        { text: "强大、可靠、有主见的人", weights: { fifth: 2 } },
        { text: "温柔、让人放松的人", weights: { canon: 2 } },
      ],
    },
    {
      id: 3,
      text: "别人第一次见你，最可能怎么评价你？",
      options: [
        { text: "有点距离感，但很特别", weights: { clair_de_lune: 2 } },
        { text: "很好相处，挺有元气", weights: { spring: 2, turkish_march: 1 } },
        { text: "气场挺强的", weights: { fifth: 2 } },
        { text: "很温和，没什么攻击性", weights: { canon: 2 } },
      ],
    },
    {
      id: 4,
      text: "你面对压力时更像哪一种？",
      options: [
        { text: "先自己消化，不太想说", weights: { clair_de_lune: 1, lacrimosa: 2 } },
        { text: "边动边解决，不能停", weights: { spring: 2, fifth: 1 } },
        { text: "硬扛，越压越想赢", weights: { fifth: 2 } },
        { text: "希望有人陪着，一起慢慢处理", weights: { canon: 2 } },
      ],
    },
    {
      id: 5,
      text: "你更喜欢哪种美感？",
      options: [
        { text: "朦胧、夜色、反光、雾气", weights: { clair_de_lune: 2 } },
        { text: "阳光、草地、风、流动感", weights: { spring: 2 } },
        { text: "庄严、强烈、戏剧张力", weights: { fifth: 2, lacrimosa: 1 } },
        { text: "简洁、对称、温柔、耐看", weights: { canon: 2 } },
      ],
    },
    {
      id: 6,
      text: "恋爱里你更像哪种类型？",
      options: [
        { text: "慢热，确认安全感后才会很深", weights: { clair_de_lune: 2, canon: 1 } },
        { text: "热烈直接，喜欢就会表达", weights: { spring: 2, turkish_march: 1 } },
        { text: "不轻易开始，但开始就很认真", weights: { fifth: 2 } },
        { text: "很会照顾情绪，也容易心软", weights: { canon: 2, lacrimosa: 1 } },
      ],
    },
    {
      id: 7,
      text: "你最怕哪一种生活状态？",
      options: [
        { text: "太吵，完全没有自己的空间", weights: { clair_de_lune: 2 } },
        { text: "停滞不前，每天都一样", weights: { spring: 2 } },
        { text: "软弱退让，被环境推着走", weights: { fifth: 2 } },
        { text: "关系冷掉，没人真正懂你", weights: { canon: 1, lacrimosa: 2 } },
      ],
    },
    {
      id: 8,
      text: "如果要选一个场景做你的专属背景，会是？",
      options: [
        { text: "月光下的湖面", weights: { clair_de_lune: 2 } },
        { text: "春天刚到的花园", weights: { spring: 2 } },
        { text: "风暴前的剧院舞台", weights: { fifth: 2 } },
        { text: "木质教堂里透进来的光", weights: { canon: 2, lacrimosa: 1 } },
      ],
    },
    {
      id: 9,
      text: "你平时更像哪种社交模式？",
      options: [
        { text: "熟了以后才会打开", weights: { clair_de_lune: 2 } },
        { text: "很容易和别人玩起来", weights: { spring: 2, turkish_march: 1 } },
        { text: "不一定热情，但存在感很强", weights: { fifth: 2 } },
        { text: "会默默照顾大家的感受", weights: { canon: 2, lacrimosa: 1 } },
      ],
    },
    {
      id: 10,
      text: "你最想让别人记住你哪一点？",
      options: [
        { text: "我的气质和感觉", weights: { clair_de_lune: 2 } },
        { text: "我的活力和热情", weights: { spring: 2 } },
        { text: "我的力量和意志", weights: { fifth: 2 } },
        { text: "我的温柔和真诚", weights: { canon: 2, lacrimosa: 1 } },
      ],
    },
  ];

  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});
  const [finished, setFinished] = useState(false);
  const [showRankingPage, setShowRankingPage] = useState(false);

  const progress = ((step + 1) / questions.length) * 100;

  const handleAnswer = (weights) => {
    const next = { ...scores };
    Object.entries(weights).forEach(([key, value]) => {
      next[key] = (next[key] || 0) + value;
    });
    setScores(next);

    if (step + 1 >= questions.length) {
      setFinished(true);
    } else {
      setStep(step + 1);
    }
  };

  const resultKey = useMemo(() => {
    const entries = Object.entries(scores);
    if (!entries.length) return "clair_de_lune";
    return entries.sort((a, b) => b[1] - a[1])[0][0];
  }, [scores]);

  const result = results[resultKey];

    const rankingData = [
    { rank: 1, key: "clair_de_lune", code: "MOON", name: "月光型", count: 3884, percent: 9.5 },
    { rank: 2, key: "spring", code: "SPRING", name: "春风型", count: 3153, percent: 7.7 },
    { rank: 3, key: "fifth", code: "FATE", name: "命运型", count: 3105, percent: 7.6 },
    { rank: 4, key: "canon", code: "CANON", name: "卡农型", count: 2531, percent: 6.2 },
    { rank: 5, key: "lacrimosa", code: "REQUIEM", name: "安魂型", count: 2210, percent: 5.4 },
    { rank: 6, key: "turkish_march", code: "TURKISH", name: "进行曲型", count: 1988, percent: 4.9 },
  ];

  const restart = () => {
    setStarted(false);
    setStep(0);
    setScores({});
    setFinished(false);
  };

  const copyResult = async () => {
    const text = `我测出来是：${result.title} ${result.emoji}\n${result.composer}\n标签：${result.tags.join(" / ")}\n快来测测你是什么古典乐曲子吧～`;
    try {
      await navigator.clipboard.writeText(text);
      alert("结果文案已复制，可以直接发给朋友了");
    } catch {
      alert("复制失败，不过你可以手动截图分享");
    }
  };

  if (showRankingPage) {
  return (
    <RankingPage
      rankingData={rankingData}
      results={results}
      onBack={() => setShowRankingPage(false)}
    />
   );
  }

  function RankingPage({ rankingData, results, onBack }) {
  return (
    <div className="min-h-screen bg-[#f0f2ee] px-6 py-10 text-zinc-800">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold md:text-5xl">古典乐结果排行榜</h1>

        <p className="mt-4 text-lg leading-8 text-zinc-600">
          这里展示不同测试结果的人气分布。当前先使用演示数据，后续可以接入真实统计。
        </p>

        <div className="mt-6 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-6 py-3 text-lg font-semibold text-emerald-700">
          已有 40,998 人完成测试
        </div>

        <div className="mt-8 space-y-4">
          {rankingData.map((item) => {
            const result = results[item.key];

            return (
              <div
                key={item.key}
                className="rounded-[1.75rem] border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <div className="grid grid-cols-[56px_64px_1fr_auto] items-center gap-4">
                  <div className="text-4xl font-bold text-amber-500">{item.rank}</div>

                  <img
                    src={result.avatar}
                    alt={result.composer}
                    className="h-14 w-14 rounded-xl border border-zinc-200 object-cover"
                    style={{ imageRendering: "pixelated" }}
                  />

                  <div>
                    <div className="text-2xl font-bold text-zinc-800">
                      {item.code}
                      <span className="ml-3 text-lg font-medium text-zinc-500">
                        {item.name}
                      </span>
                    </div>

                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-200">
                      <div
                        className="h-full rounded-full bg-emerald-700"
                        style={{ width: `${item.percent * 8}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-bold">{item.count.toLocaleString()}</div>
                    <div className="text-lg text-zinc-500">{item.percent}%</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <button
            onClick={onBack}
            className="rounded-2xl bg-emerald-700 px-6 py-4 text-lg font-semibold text-white transition hover:opacity-90"
          >
            返回
          </button>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className={`min-h-screen bg-gradient-to-br ${result?.color || "from-zinc-900 to-black"} text-white transition-all duration-700`}>
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
        {!started && !finished && (
          <>
            <div className="mt-10 mb-8 text-center">
              <div className="mb-4 text-sm tracking-[0.35em] text-white/70">CLASSICAL MUSIC TYPE</div>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">测测你是什么古典音乐</h1>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/80 md:text-lg">
                10道题，测出你的气质最像哪一首古典乐。
                <br />
                不是专业乐理测试，是适合分享的氛围型人格小网站。
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md shadow-2xl">
                <div className="mb-3 text-sm text-white/70">你会得到</div>
                <ul className="space-y-2 text-white/90 text-sm md:text-base">
                  <li>• 你的专属曲子结果</li>
                  <li>• 性格标签 + 氛围说明</li>
                  <li>• 相似古典曲目推荐</li>
                </ul>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <button
                  onClick={() => setStarted(true)}
                  className="rounded-3xl bg-white px-6 py-4 text-lg font-semibold text-zinc-900 shadow-xl transition hover:scale-[1.01] active:scale-[0.99]"
                >
                  开始测试
                </button>

                <button
                  onClick={() => setShowRankingPage(true)}
                  className="rounded-3xl border border-white/20 bg-white/10 px-6 py-4 text-lg font-semibold text-white shadow-xl transition hover:bg-white/20 active:scale-[0.99]"
                >
                  排行榜
                </button>
              </div>
            </div>
          </>
        )}

        {started && !finished && (
          <>
            <div className="mb-6 mt-4 flex items-center justify-between text-sm text-white/80">
              <span>← {step + 1} / {questions.length}</span>
              <span>认真一点，选最像你的</span>
            </div>

            <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>

            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-md shadow-2xl">
              <div className="mb-6 text-2xl font-semibold leading-relaxed md:text-3xl">
                {questions[step].text}
              </div>

              <div className="grid gap-3">
                {questions[step].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.weights)}
                    className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-left text-base text-white transition hover:bg-white/20 active:scale-[0.99]"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {finished && (
          <div className="my-auto">
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 md:p-8 backdrop-blur-md shadow-2xl">
              <div className="text-sm tracking-[0.3em] text-white/70">你的测试结果</div>
              <div className="mt-4 text-6xl">{result.emoji}</div>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">{result.title}</h2>
              <p className="mt-3 text-white/80">{result.composer} · {result.era}</p>

              <div className="mt-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4">
                <img
                  src={result.avatar}
                  alt={result.composer}
                  className="h-20 w-20 rounded-xl border border-white/15 object-cover"
                  style={{ imageRendering: "pixelated" }}
                />
                <div>
                  <div className="text-sm text-white/60">对应作曲家</div>
                  <div className="text-lg font-semibold text-white">{result.composer}</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 text-sm text-white/70">点击播放对应曲子</div>
                <audio controls className="w-full">
                  <source src={result.audio} type="audio/mpeg" />
                  你的浏览器不支持音频播放。
                </audio>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {result.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/15 px-3 py-1 text-sm text-white/90">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-4 text-sm leading-7 text-white/90 md:text-base">
                <p>{result.description}</p>
                <p>{result.vibe}</p>
                <p className="text-white/80">{result.recommendation}</p>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-3">
                <button
                  onClick={() => setShowRankingPage(true)}
                  className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 font-semibold text-white transition hover:bg-white/20 active:scale-[0.99]"
                >
                  排行榜
                </button>
                
                <button
                  onClick={copyResult}
                  className="rounded-2xl bg-white px-5 py-4 font-semibold text-zinc-900 transition hover:scale-[1.01] active:scale-[0.99]"
                >
                  分享给朋友
                </button>
                <button
                  onClick={restart}
                  className="rounded-2xl border border-white/20 bg-transparent px-5 py-4 font-semibold text-white transition hover:bg-white/10 active:scale-[0.99]"
                >
                  再测一次
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-xs text-white/60">
          made by ejika
        </div>
      </div>
    </div>
  );
}
import { useEffect, useMemo, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { supabase } from "./lib/supabase";

export default function ClassicalPieceQuiz() {
  const [lang, setLang] = useState("zh");

  const ui = {
    zh: {
      language: "语言",
      chinese: "中文",
      japanese: "日本語",
      english: "english",
      header: "CLASSICAL MUSIC TYPE",
      title: "测测你是什么古典音乐",
      subtitle: "10道题，测出你的气质最像哪一首古典乐。",
      youWillGet: "你会得到",
      get1: "你的专属曲子结果",
      get2: "性格标签 + 氛围说明",
      get3: "相似古典曲目推荐",
      start: "开始测试",
      ranking: "排行榜",
      chooseTip: "认真一点，选最像你的",
      resultLabel: "你的测试结果",
      composerLabel: "对应作曲家",
      playMusic: "点击播放对应曲子",
      share: "分享给朋友",
      restart: "再测一次",
      back: "返回",
      rankingTitle: "古典乐结果排行榜",
      rankingDesc: "这里展示不同测试结果的人气分布。当前已接入真实统计。",
      totalTests: "已有",
      totalTestsEnd: "人完成测试",
      loading: "排行榜加载中...",
      shareType: "你的古典乐人格类型是",
      scanAgain: "扫码再测一次",
      shareFooter: "快来测测你是哪一首古典乐",
      saveResult: "保存结果",
      close: "关闭",
      browserNoAudio: "你的浏览器不支持音频播放。",
    },
    ja: {
      language: "言語",
      chinese: "中文",
      japanese: "日本語",
      english: "english",
      header: "CLASSICAL MUSIC TYPE",
      title: "あなたはどんなクラシック音楽？",
      subtitle: "10問で、あなたの雰囲気に一番近いクラシック曲を診断します。",
      youWillGet: "診断でわかること",
      get1: "あなた専用のクラシック曲タイプ",
      get2: "性格タグ + 雰囲気説明",
      get3: "似ているクラシック曲のおすすめ",
      start: "診断を始める",
      ranking: "ランキング",
      chooseTip: "一番自分に近いものを選んでください",
      resultLabel: "あなたの診断結果",
      composerLabel: "対応する作曲家",
      playMusic: "対応する曲を再生",
      share: "友達にシェア",
      restart: "もう一度診断",
      back: "戻る",
      rankingTitle: "クラシック診断ランキング",
      rankingDesc: "ここでは診断結果の人気分布を表示します。現在は実際の統計に接続されています。",
      totalTests: "すでに",
      totalTestsEnd: "人が診断しました",
      loading: "ランキングを読み込み中...",
      shareType: "あなたのクラシック音楽タイプは",
      scanAgain: "QRコードでもう一度診断",
      shareFooter: "あなたはどのクラシック曲タイプ？",
      saveResult: "結果を保存",
      close: "閉じる",
      browserNoAudio: "お使いのブラウザは音声再生に対応していません。",
    },
    en: {
      language: "Language",
      chinese: "CN",
      japanese: "JP",
      english: "EN",
      header: "CLASSICAL MUSIC TYPE",
      title: "Which classical piece are you?",
      subtitle: "Answer 10 questions and find the classical piece that matches your vibe.",
      youWillGet: "You will get",
      get1: "Your personal classical music type",
      get2: "Personality tags + vibe description",
      get3: "Similar classical music recommendations",
      start: "Start Quiz",
      ranking: "Ranking",
      chooseTip: "Choose the one that feels most like you",
      resultLabel: "Your result",
      composerLabel: "Composer",
      playMusic: "Play the matching piece",
      share: "Share with friends",
      restart: "Try again",
      back: "Back",
      rankingTitle: "Classical Music Result Ranking",
      rankingDesc: "This page shows the popularity distribution of different quiz results. Real statistics are connected.",
      totalTests: "",
      totalTestsEnd: " people have completed the quiz",
      loading: "Loading ranking...",
      shareType: "Your classical music personality type is",
      scanAgain: "Scan to try again",
      shareFooter: "Find out which classical piece you are",
      saveResult: "Save result",
      close: "Close",
      browserNoAudio: "Your browser does not support audio playback.",
    },
  };

  const t = ui[lang];

const results = {
  clair_de_lune: {
    title: "你是《月光》",
    rankTitle: "月光",
    composer: "德彪西 Claude Debussy",
    era: "印象派",
    emoji: "🌙",
    avatar: "/avatars/debussy.png",
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
    rankTitle: "四季・春",
    composer: "维瓦尔第 Antonio Vivaldi",
    era: "巴洛克",
    emoji: "🌿",
    avatar: "/avatars/vivaldi.png",
    color: "from-emerald-700 via-green-600 to-lime-500",
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
    rankTitle: "命运交响曲",
    composer: "贝多芬 Ludwig van Beethoven",
    era: "古典主义 / 浪漫主义过渡",
    emoji: "⚡",
    avatar: "/avatars/beethoven.png",
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
    rankTitle: "卡农",
    composer: "帕赫贝尔 Johann Pachelbel",
    era: "巴洛克",
    emoji: "🕊️",
    avatar: "/avatars/pachelbel.png",
    color: "from-stone-700 via-amber-700 to-rose-800",
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
    rankTitle: "Lacrimosa",
    composer: "莫扎特 Wolfgang Amadeus Mozart",
    era: "古典主义",
    emoji: "🕯️",
    avatar: "/avatars/Mozart.png",
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
    rankTitle: "土耳其进行曲",
    composer: "莫扎特 Wolfgang Amadeus Mozart",
    era: "古典主义",
    emoji: "🎹",
    avatar: "/avatars/Mozart.png",
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
  const [showShareModal, setShowShareModal] = useState(false);
  const [rankingData, setRankingData] = useState([]);
  const [rankingLoading, setRankingLoading] = useState(false);
  const hasSubmittedRef = useRef(false);
  const [totalTests, setTotalTests] = useState(0);  

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
  const shareUrl = "https://music-vert-two.vercel.app/";

  const shareCardRef = useRef(null);

  const restart = () => {
    setStarted(false);
    setStep(0);
    setScores({});
    setFinished(false);
    hasSubmittedRef.current = false;
};

 const saveResultImage = async () => {
  if (!shareCardRef.current) return;

  try {
    const dataUrl = await toPng(shareCardRef.current, {
      cacheBust: true,
      pixelRatio: 2,
    });

    const link = document.createElement("a");
    link.download = `${result.title}-测试结果.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("保存图片失败：", error);
    alert("保存图片失败，请重试");
  }
};
useEffect(() => {
  if (!finished) return;
  if (hasSubmittedRef.current) return;

  const submitResult = async () => {
    const { error } = await supabase.from("quiz_results").insert([
      { result_key: resultKey }
    ]);

    if (error) {
      console.error("提交结果失败：", error);
      return;
    }

    hasSubmittedRef.current = true;
  };

  submitResult();
}, [finished, resultKey]);

const fetchRankingData = async () => {
  setRankingLoading(true);

  const { data, error } = await supabase.rpc("get_quiz_ranking");

  if (error) {
    console.error("读取排行榜失败：", error);
    setRankingLoading(false);
    return;
  }

  const countsMap = new Map(
    (data || []).map((item) => [item.result_key, Number(item.total || 0)])
  );

  const total = Array.from(countsMap.values()).reduce((sum, count) => sum + count, 0);
  setTotalTests(total);

  const allResults = Object.entries(results).map(([key, value]) => {
    const count = countsMap.get(key) || 0;
    const percent = total > 0 ? Number(((count / total) * 100).toFixed(1)) : 0;

    return {
      key,
      code: key.toUpperCase(),
      name: value.title.replace("你是", ""),
      count,
      percent,
    };
  });

  allResults.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.key.localeCompare(b.key);
  });

  const ranked = allResults.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  setRankingData(ranked);
  setRankingLoading(false);
};

const openRankingPage = async () => {
  await fetchRankingData();
  setShowRankingPage(true);
};

if (showRankingPage) {
  return (
    <RankingPage
      rankingData={rankingData}
      results={results}
      loading={rankingLoading}
      totalTests={totalTests}
      onBack={() => setShowRankingPage(false)}
      t={t}
    />
  );
}
  
function RankingPage({ rankingData, results, onBack, loading, totalTests, t }) {
  return (
    <div className="min-h-screen bg-[#f0f2ee] px-6 py-10 text-zinc-800">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold md:text-5xl">{t.rankingTitle}</h1>

        <p className="mt-4 text-lg leading-8 text-zinc-600">
          {t.rankingDesc}
        </p>

        <div className="mt-6 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-6 py-3 text-lg font-semibold text-emerald-700">
          {t.totalTests} {totalTests.toLocaleString()} {t.totalTestsEnd}
        </div>
        {loading && (
          <div className="mt-6 rounded-2xl bg-white p-4 text-lg text-zinc-500 shadow-sm">
            {t.loading}
          </div>
        )}

        {!loading && (
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
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="text-3xl font-extrabold text-zinc-900">
                          {result.rankTitle}
                        </span>
                        <span className="text-base font-medium text-zinc-500">
                          {result.composer}
                        </span>
                      </div>

                      <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-200">
                        <div
                          className="h-full rounded-full bg-emerald-700"
                          style={{ width: `${Math.max(item.percent, item.count > 0 ? 8 : 0)}%` }}
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
        )}

        <div className="mt-8">
          <button
            onClick={onBack}
            className="rounded-2xl bg-emerald-700 px-6 py-4 text-lg font-semibold text-white transition hover:opacity-90"
          >
            {t.back}
          </button>
        </div>
      </div>
    </div>
  );
}

  function ShareModal({ open, onClose, result, onSave, shareUrl, cardRef, t }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-[2rem] border border-zinc-200 bg-[#f6f5f2] p-4 text-zinc-800 shadow-2xl">
        
        <div
          ref={cardRef}
          className="rounded-[1.5rem] border border-zinc-200 bg-white p-4"
        >
          <div className="text-center">
            <div className="text-sm text-zinc-500">{t.shareType}</div>
            <div className="mt-2 text-3xl font-bold text-emerald-700">
              {result.emoji} {result.title}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="flex items-center gap-4">
              <img
                src={result.avatar}
                alt={result.composer}
                className="h-24 w-24 rounded-2xl border border-zinc-200 object-cover"
                style={{ imageRendering: "pixelated" }}
              />

              <div className="text-left">
                <div className="text-sm text-zinc-500">{t.composerLabel}</div>
                <div className="text-lg font-semibold">{result.composer}</div>
                <div className="mt-1 text-sm text-zinc-500">{result.era}</div>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-zinc-100 p-3 text-sm leading-6 text-zinc-700">
              {result.description}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {result.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-zinc-50 p-4">
            <div>
              <div className="text-sm text-zinc-500">{t.scanAgain}</div>
              <div className="mt-1 text-sm text-zinc-700 break-all">
                {shareUrl}
              </div>
            </div>

            <div className="shrink-0 rounded-xl bg-white p-2">
              <QRCodeSVG value={shareUrl} size={88} />
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-zinc-500">
            {t.shareFooter}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
          <button
            onClick={onSave}
            className="rounded-2xl bg-emerald-700 px-5 py-4 text-lg font-semibold text-white transition hover:opacity-90"
          >
            {t.saveResult}
          </button>

          <button
            onClick={onClose}
            className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-lg font-semibold text-zinc-700 transition hover:bg-zinc-50"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
  return (
    <div className={`min-h-screen bg-gradient-to-br ${result?.color || "from-zinc-900 to-black"} text-white transition-all duration-700`}>
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
                <div className="mb-4 flex justify-end">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md">
            <span className="text-white/70">{t.language}</span>

            <button
              onClick={() => setLang("zh")}
              className={`rounded-full px-3 py-1 transition ${
                lang === "zh" ? "bg-white text-zinc-900" : "text-white hover:bg-white/10"
              }`}
            >
              {t.chinese}
            </button>

            <button
              onClick={() => setLang("ja")}
              className={`rounded-full px-3 py-1 transition ${
                lang === "ja" ? "bg-white text-zinc-900" : "text-white hover:bg-white/10"
              }`}
            >
              {t.japanese}
            </button>

            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-3 py-1 transition ${
                lang === "en" ? "bg-white text-zinc-900" : "text-white hover:bg-white/10"
              }`}
            >
              {t.english}
            </button>
          </div>
        </div>

        {!started && !finished && (
          <>
            <div className="mt-10 mb-8 text-center">
              <div className="mb-4 text-sm tracking-[0.35em] text-white/70">{t.header}</div>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">{t.title}</h1>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/80 md:text-lg">
                {t.subtitle}
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md shadow-2xl">
                <div className="mb-3 text-sm text-white/70">{t.youWillGet}</div>
                <ul className="space-y-2 text-white/90 text-sm md:text-base">
                  <li>• {t.get1}</li>
                  <li>• {t.get2}</li>
                  <li>• {t.get3}</li>
                </ul>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <button
                  onClick={() => setStarted(true)}
                  className="rounded-3xl bg-white px-6 py-4 text-lg font-semibold text-zinc-900 shadow-xl transition hover:scale-[1.01] active:scale-[0.99]"
                >
                  {t.start}
                </button>

                <button
                  onClick={openRankingPage}
                  className="rounded-3xl border border-white/20 bg-white/10 px-6 py-4 text-lg font-semibold text-white shadow-xl transition hover:bg-white/20 active:scale-[0.99]"
                >
                  {t.ranking}
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
              <div className="text-sm tracking-[0.3em] text-white/70">{t.resultLabel}</div>
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
                 <div className="text-sm text-white/60">{t.composerLabel}</div>
                  <div className="text-lg font-semibold text-white">{result.composer}</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 text-sm text-white/70">{t.playMusic}</div>
                <audio controls className="w-full">
                  <source src={result.audio} type="audio/mpeg" />
                  {t.browserNoAudio}
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
                  onClick={openRankingPage}
                  className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 font-semibold text-white transition hover:bg-white/20 active:scale-[0.99]"
                >
                  {t.ranking}
                </button>
                
                <button
                  onClick={() => setShowShareModal(true)}
                  className="rounded-2xl bg-white px-5 py-4 font-semibold text-zinc-900 transition hover:scale-[1.01] active:scale-[0.99]"
                >
                  {t.share}
                </button>
                <button
                  onClick={restart}
                  className="rounded-2xl border border-white/20 bg-transparent px-5 py-4 font-semibold text-white transition hover:bg-white/10 active:scale-[0.99]"
                >
                  {t.restart}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-xs text-white/60">
          made by null
        </div>
        <ShareModal
          open={showShareModal}
          onClose={() => setShowShareModal(false)}
          result={result}
          onSave={saveResultImage}
          shareUrl={shareUrl}
          cardRef={shareCardRef}
          t={t}
        />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function Home() {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("猫咪");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [symptom, setSymptom] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const analyzePet = async () => {
    setLoading(true);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        petName,
        petType,
        age,
        weight,
        symptom,
      }),
    });

    const data = await res.json();

    setResult(data.result);

    setLoading(false);
  };
  return (
    <div className="min-h-screen overflow-hidden bg-[#03101c] text-slate-100">
      <div className="relative isolate px-6 py-10 sm:px-12 lg:px-20">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.24),_transparent_55%)] blur-3xl" />
        <div className="absolute left-1/2 top-28 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-y-0 right-0 w-72 bg-[radial-gradient(circle,_rgba(56,189,248,0.14),_transparent_55%)] blur-3xl" />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-6 text-sm text-cyan-200">
          <div className="flex items-center gap-3 rounded-3xl border border-cyan-300/20 bg-white/5 px-4 py-3 shadow-[0_20px_80px_rgba(14,165,233,0.10)] backdrop-blur">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-300/30 font-semibold">
              PC
            </span>
            <div>
              <p className="text-base font-bold text-cyan-100">PetCopilot</p>
              <p className="text-xs text-cyan-200/80">AI 宠物养育顾问</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-100 shadow-sm md:flex">
            让每位宠物主人获得专业、即时的健康建议
          </div>
        </header>

        <main className="relative z-10 mx-auto mt-16 max-w-5xl">
          <section className="grid gap-12 lg:grid-cols-[1.3fr_0.9fr] lg:items-end">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-300/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-cyan-200 ring-1 ring-cyan-300/25">
                作品集展示 · 宠物健康 AI
              </div>

              <div className="space-y-6">
                <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
                  AI宠物养育顾问
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                  上传症状，获得专业健康分析和喂养建议，帮助宠物主人做出更精准、更放心的护理决策。
                </p>
              </div>

              <div className="space-y-4 rounded-3xl border border-cyan-300/20 bg-slate-950/40 p-6">

                <input
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="宠物名字（例如：可乐）"
                    className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white outline-none"
                />
                

                <select
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                  className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white outline-none"
                >
                  <option>猫咪</option>
                  <option>狗狗</option>
                </select>

                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="年龄（例如：2岁）"
                  className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white outline-none"
                />

                <input
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="体重（例如：4kg）"
                  className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white outline-none"
                />


                <textarea
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                  placeholder="描述症状，例如：最近不吃东西、精神不好、有呕吐"
                  className="w-full h-36 rounded-2xl bg-slate-900 px-4 py-3 text-white outline-none resize-none"
                />

                <button
                  onClick={analyzePet}
                  className="w-full rounded-full bg-cyan-400 px-8 py-4 font-semibold text-slate-950 hover:bg-cyan-300"
                >
                  {loading ? "分析中..." : "开始AI分析"}
                </button>
                {result && (               
                  <div className="mt-6 rounded-3xl border border-cyan-300/20 bg-slate-900 p-6">
                    <h2 className="text-xl font-bold text-cyan-300 mb-4">
                      AI分析结果
                    </h2>

                    <p className="whitespace-pre-line text-slate-200 leading-8">
                      {result}
                    </p>
                  </div>
                )}              
                </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="group rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_30px_60px_rgba(0,0,0,0.28)] transition duration-500 hover:-translate-y-2 hover:border-cyan-300/30 hover:bg-slate-900/70">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300 text-xl backdrop-blur">
                    🧠
                  </div>
                  <h2 className="mb-2 text-lg font-semibold text-white">健康分析</h2>
                  <p className="text-sm leading-6 text-slate-300">
                    深入解读宠物症状，提供及时的健康评估与关怀建议。
                  </p>
                </div>
                <div className="group rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_30px_60px_rgba(0,0,0,0.28)] transition duration-500 hover:-translate-y-2 hover:border-cyan-300/30 hover:bg-slate-900/70">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300 text-xl backdrop-blur">
                    🍽️
                  </div>
                  <h2 className="mb-2 text-lg font-semibold text-white">饮食建议</h2>
                  <p className="text-sm leading-6 text-slate-300">
                    根据宠物体质和症状，推荐科学喂养方案和营养搭配。
                  </p>
                </div>
                <div className="group rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_30px_60px_rgba(0,0,0,0.28)] transition duration-500 hover:-translate-y-2 hover:border-cyan-300/30 hover:bg-slate-900/70">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300 text-xl backdrop-blur">
                    📈
                  </div>
                  <h2 className="mb-2 text-lg font-semibold text-white">成长记录</h2>
                  <p className="text-sm leading-6 text-slate-300">
                    追踪宠物成长轨迹，记录每一次健康变化与护理成果。
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-slate-950/60 p-6 shadow-[0_40px_120px_rgba(7,89,133,0.25)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.14),_transparent_40%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.14),_transparent_40%)]" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between gap-4 rounded-3xl bg-white/5 p-5 text-slate-200 ring-1 ring-white/10 backdrop-blur">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">咨询进度</p>
                    <p className="mt-2 text-2xl font-semibold text-white">72% 已完成</p>
                  </div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/20 text-cyan-200">
                    🐾
                  </div>
                </div>
                <div className="space-y-4 rounded-3xl bg-slate-900/80 p-6 ring-1 ring-white/5">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>症状分析</span>
                    <span>45s</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-3/4 animate-pulse rounded-full bg-cyan-400" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-900/80 p-5 ring-1 ring-white/5">
                    <p className="text-sm text-cyan-200/80">最新建议</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      结合体重和年龄，推荐优先关注肠胃健康与日常补水。
                    </p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/80 p-5 ring-1 ring-white/5">
                    <p className="text-sm text-cyan-200/80">养护提醒</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      每周更新喂养计划，记录体温与活力状态。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}





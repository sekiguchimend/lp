'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/app/components/ui/avatar"
import Link from "next/link"
import { motion, useInView, useAnimation, } from "framer-motion"
import { Clock, AlertTriangle, BookOpen, Check} from 'lucide-react'

const sectionTitleStyles = `
  .section-title {
    position: relative;
    padding-bottom: 0.5rem;
    font-family: "Noto Serif JP", serif;
  }
  .section-title::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background-color: rgba(59, 130, 246, 0.5);
  }
  .section-title-soft {
    color: #4a5568;
    font-weight: 500;
    font-family: "Noto Sans JP", sans-serif;
  }
`

interface TypewriterTextProps {
  text: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prevText => prevText + text[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return <span>{displayText}</span>
}

interface AnimatedItemProps {
  children: React.ReactNode;
  index: number;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({ children, index }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      {children}
    </motion.div>
  )
}

interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
}

interface PricingPlan {
  name: string;
  price: string;
  capacity: string;
  features: string[];
}

const Component: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const features: Feature[] = [
    { title: "出発時間の共有", description: "生徒が家を出発する際に出発ボタンを押すことで先生の画面に生徒の出発時間が記録されます。", icon: Clock },
    { title: "当日の遅刻に対応", description: "想定以上に部活が伸びて15分くらいの遅刻の時にそれを生徒が先生に知らせることができます。", icon: AlertTriangle },
    { title: "先生画面の良さ", description: "先生画面では学年ごとに生徒が分かれて記録されているため非常にわかりやすく使うことができます。", icon: BookOpen }
  ]

  const testimonials: Testimonial[] = [
    { name: "山田さん", role: "私立学校 教頭", content: "自分の子供の安全が簡単に管理できるのでどの塾にも導入させるべきサービスです。" },
    { name: "佐藤さん", role: "公立中学校 教諭", content: "親が今までは対応してたことが生徒自身でできるようになり塾側も親側もストレス無く使えています。" },
    { name: "鈴木さん", role: "学習塾 経営者", content: "5分の遅れの時親に電話するのは野暮だし事故にあってたという不安もあるしで迷っていたことが解決しました。" }
  ]

  const pricingPlans: PricingPlan[] = [
    { name: "ベーシックプラン", price: "¥50", capacity: "生徒一人50円", features: ["全機能利用可能", "カスタマーサポート対応", "月次レポート"] },
    { name: "スタンダードプラン", price: "¥60", capacity: "生徒一人60円で100人以上の塾の場合", features: ["全機能利用可能", "カスタマーサポート対応", "月次レポート","生徒数100人以上の塾はこのプラン"] },
    { name: "プレミアムプラン", price: "¥80", capacity: "生徒一人60円で200人以上の塾の場合", features: ["全機能利用可能", "カスタマーサポート対応", "月次レポート","生徒数200人以上の塾はこのプラン"] }
  ]

  return (
    <>
      <style jsx>{sectionTitleStyles}</style>
      <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-blue-50 via-white to-blue-50">
        <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md shadow-md z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-blue-600">krat</h1>
            <nav className="flex space-x-4">
              <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">機能</Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">ユーザーの声</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">料金プラン</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 pt-20">
          <section className="py-20 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 section-title">
                <TypewriterText text="遅刻なの事故なの？" />
              </h2>
              <p className="text-xl mb-8 text-gray-200 font-serif">
                <TypewriterText text="kratは、生徒の安否確認ができるシンプルなアプリです。生徒の家からの出発時間を知ることで事故があっても即気づくことができ遅刻にも対応できます。" />
              </p>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 transition-colors text-lg py-2 px-6">詳しく見る</Button>
            </div>
          </section>

          <section id="features" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 section-title section-title-soft">主な機能</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {features.map((feature, index) => (
                  <AnimatedItem key={index} index={index}>
                    <div className="text-center">
                      <feature.icon className="w-16 h-16 mx-auto mb-6 text-blue-600" />
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </AnimatedItem>
                ))}
              </div>
            </div>
          </section>

          <section id="testimonials" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 section-title section-title-soft">ユーザーの声</h2>
              <div className="relative overflow-hidden" style={{ height: '200px' }}>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="absolute top-0 left-0 w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeTestimonial === index ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="max-w-2xl mx-auto">
                      <CardContent className="p-6 text-center">
                        <p className="text-lg mb-4">`{testimonial.content}`</p>
                        <div className="flex items-center justify-center">
                          <Avatar className="w-16 h-16 border-2 border-blue-500">
                            <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Avatar" />
                            <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4 text-left">
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="pricing" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 section-title section-title-soft">料金プラン</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {pricingPlans.map((plan, index) => (
                  <AnimatedItem key={index} index={index}>
                    <Card className="flex flex-col h-full">
                      <CardContent className="p-6 flex-1">
                        <h3 className="text-2xl mb-2">{plan.name}</h3>
                        <p className="text-4xl mb-1">{plan.price}</p>
                        <p className="text-gray-500 mb-4">月額 ({plan.capacity})</p>
                        <ul className="space-y-2 mb-6">
                          {plan.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center">
                              <Check className="w-5 h-5 mr-2 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </AnimatedItem>
                ))}
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="text-lg text-gray-700 mb-4">
                ご検討いただける方は、以下のメールアドレスにてお話をうかがえればと思います。
              </p>
              <a href="mailto:info@krat.jp" className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                sekiguchishunya0619@gmail.com
              </a>
            </div>
          </section>
        </main>

        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-2xl font-bold mb-4">krat</h3>
                <p className="mb-4">生徒の安全を守る、次世代の安否確認サービス</p>
                <div className="flex space-x-4">
                  <a href="https://x.com/SekiguchiS39523" className="text-white hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                  </a>
                  <a href="https://github.com/sekiguchimend" className="text-white hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">リンク</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:text-blue-400 transition-colors">ホーム</Link></li>
                  <li><Link href="#features" className="hover:text-blue-400 transition-colors">機能</Link></li>
                  <li><Link href="#pricing" className="hover:text-blue-400 transition-colors">料金プラン</Link></li>
                  <li><Link href="#" className="hover:text-blue-400 transition-colors">お問い合わせ</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">法的情報</h4>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="/プライバシーポリシー.txt" 
                      download 
                      className="hover:text-blue-400 transition-colors"
                    >
                      プライバシーポリシー
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/利用規約.txt" 
                      download 
                      className="hover:text-blue-400 transition-colors"
                    >
                      利用規約
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
              <p>&copy; 2024 krat. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Component
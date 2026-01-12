import React, { useState, useEffect, useRef } from 'react';
import { Lock, ArrowLeftRight, ChevronLeft, X, ExternalLink, CheckCircle, MousePointer2, Search, Play, Zap, Target, TrendingUp } from 'lucide-react';

function App() {
    const [step, setStep] = useState('intro'); // 'intro', 'onboarding', 'connecting', 'splash', 'store', 'product-detail', 'amazon-simulation', 'amazon-referral', 'purchase-verification', 'profile'
    const [isExitingSplash, setIsExitingSplash] = useState(false);
    const [selections, setSelections] = useState({
        concerns: ['Acne & Blemishes'],
        hairType: ['Frizzy'],
        skinType: ['Oily']
    });
    // eslint-disable-next-line no-unused-vars
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [showCashbackInfoModal, setShowCashbackInfoModal] = useState(false);
    const videoFeedRef = useRef(null);
    const simulationVideoRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [showVirtualCursor, setShowVirtualCursor] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: '50%', y: '50%' });
    const [isVirtualClicking, setIsVirtualClicking] = useState(false);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - videoFeedRef.current.offsetLeft);
        setScrollLeft(videoFeedRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - videoFeedRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        videoFeedRef.current.scrollLeft = scrollLeft - walk;
    };

    // Auto-transitions
    useEffect(() => {
        if (step === 'connecting') {
            const timer = setTimeout(() => {
                setStep('splash');
            }, 3000);
            return () => clearTimeout(timer);
        }
        if (step === 'splash') {
            const timer = setTimeout(() => {
                setIsExitingSplash(true);
                const exitTimer = setTimeout(() => {
                    setStep('store');
                    setIsExitingSplash(false);
                }, 700); // duration of slide-up-exit
                return () => clearTimeout(exitTimer);
            }, 1500); // 1.5s wait on splash
            return () => clearTimeout(timer);
        }
    }, [step]);

    const toggleSelection = (category, value) => {
        setSelections(prev => {
            const current = prev[category];
            const isSelected = current.includes(value);
            if (isSelected) {
                return { ...prev, [category]: current.filter(item => item !== value) };
            } else {
                return { ...prev, [category]: [...current, value] };
            }
        });
    };

    const SelectionButton = ({ label, isSelected, onClick }) => (
        <button
            onClick={onClick}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${isSelected
                ? 'bg-subak-red/10 border-subak-red text-subak-red shadow-sm'
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
        >
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-[#FFF5F6] bg-gradient-to-br from-[#FFF5F6] via-[#FFE5E9] to-[#FFD1D9] flex items-center justify-center p-4 selection:bg-[#FF6B81]/20">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FF6B81] opacity-[0.05] rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FF6B81] opacity-[0.08] rounded-full blur-[120px]"></div>
            </div>
            {/* Mobile Frame */}
            <div className={`w-full max-w-[400px] rounded-[40px] shadow-2xl overflow-hidden border-[8px] border-gray-900 h-[850px] flex flex-col relative transition-all duration-1000 ${step === 'splash' ? 'bg-[#FC6C85]' : 'bg-white'}`}>

                {/* Splash Layer (Overlay) */}
                {(step === 'splash' || isExitingSplash) && (
                    <div className={`absolute inset-0 w-full h-full bg-gradient-to-b from-[#FC6C85] to-[#FFADB9] flex flex-col items-center justify-center z-50 ${isExitingSplash ? 'animate-slide-up-exit' : 'animate-slide-down'}`}>
                        <div className="text-center">
                            <h1 className={`text-[64px] font-serif font-bold text-white leading-none tracking-tight mb-2 ${!isExitingSplash ? 'opacity-0 animate-pop-up' : ''}`} style={!isExitingSplash ? { animationDelay: '0.7s' } : {}}>
                                SubaK
                            </h1>
                            <p className={`text-xl font-inter font-bold text-black tracking-wide ${!isExitingSplash ? 'opacity-0 animate-pop-up' : ''}`} style={!isExitingSplash ? { animationDelay: '0.9s' } : {}}>
                                Shop. Shoot. Save.
                            </p>
                        </div>
                    </div>
                )}

                {/* Global Status Bar (for all screens except full splash) */}
                {(step !== 'splash' && !isExitingSplash) && (
                    <div className={`${step === 'store' ? 'bg-subak-red' : 'bg-white'} z-50 shrink-0`}>
                        <div className="w-full h-10 flex items-center justify-between px-8 pt-2">
                            <span className={`text-xs font-bold ${step === 'store' ? 'text-white' : 'text-black'}`}>9:41</span>
                            <div className="flex gap-1.5 px-0.5">
                                <div className={`w-3.5 h-3.5 rounded-full ${step === 'store' ? 'bg-white' : 'bg-black'}`}></div>
                                <div className={`w-3.5 h-3.5 rounded-full ${step === 'store' ? 'bg-white/30' : 'bg-black/20'}`}></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step Contents */}
                <div className={`flex-1 flex flex-col ${['connecting'].includes(step) ? 'justify-center items-center' : ''}`}>

                    {step === 'intro' && (
                        <div className="absolute inset-0 bg-white z-[1000] flex flex-col animate-in fade-in duration-700 overflow-hidden">
                            <div className="flex-1 px-8 pt-12 pb-4">
                                {/* Brand Identity */}
                                <div className="flex items-center gap-2.5 mb-8">
                                    <div className="w-10 h-10 shadow-lg shadow-[#FF6B81]/30 overflow-hidden rounded-xl">
                                        <img src="/subak-logo-new.png" alt="SubaK Logo" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-serif font-bold text-[#111111]">SubaK</h1>
                                        <div className="h-0.5 w-full bg-[#FF6B81] rounded-full mt-0.5 opacity-20"></div>
                                    </div>
                                </div>

                                {/* Headline */}
                                <div className="mb-8">
                                    <h2 className="text-[28px] font-extrabold text-[#111111] leading-[1.15] tracking-tight mb-2">
                                        Sales Guaranteed.<br />
                                        Content Unlimited.
                                    </h2>
                                    <p className="text-[#FF6B81] font-bold text-base leading-snug">
                                        매출이 보장되는 상시 숏폼 바이럴 플랫폼, SubaK
                                    </p>
                                </div>

                                {/* Value Propositions */}
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 shrink-0 bg-[#FF6B81]/10 rounded-lg flex items-center justify-center">
                                            <Zap className="w-5 h-5 text-[#FF6B81]" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-[#111111] mb-1">No Risk, High Return</h3>
                                            <p className="text-gray-500 text-[13px] leading-relaxed">
                                                구매 확정 이후 비용이 발생하는 구조로 리스크 없이 진정성 있는 구매전환형 콘텐츠를 확보할 수 있습니다.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 shrink-0 bg-[#FF6B81]/10 rounded-lg flex items-center justify-center">
                                            <Target className="w-5 h-5 text-[#FF6B81]" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-[#111111] mb-1">Genuine Content (진정성)</h3>
                                            <p className="text-gray-500 text-[13px] leading-relaxed">
                                                협찬을 통한 비자발적 콘텐츠가 아닌, 직접 구매한 제품에 대한 진정성과 서사 있는 리뷰 콘텐츠를 생산합니다.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 shrink-0 bg-[#FF6B81]/10 rounded-lg flex items-center justify-center">
                                            <TrendingUp className="w-5 h-5 text-[#FF6B81]" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-[#111111] mb-1">Data-Driven Insight</h3>
                                            <p className="text-gray-500 text-[13px] leading-relaxed">
                                                어떤 콘텐츠가 구매를 이끌었는지 추적합니다. 크리에이터별 기여도 데이터를 통해 마케팅 효율을 극대화하세요.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom CTA Section */}
                            <div className="p-8 bg-gray-50 border-t border-gray-100">
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                    <p className="text-gray-400 text-[11px] font-medium text-center">
                                        본 사이트는 SubaK의 비즈니스 모델과 User Flow를 시연하기 위한 Demo Web입니다.
                                    </p>
                                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                </div>
                                <button
                                    onClick={() => setStep('onboarding')}
                                    className="w-full bg-[#111111] text-white font-bold py-5 rounded-2xl text-lg shadow-xl shadow-black/10 active:scale-[0.98] transition-all hover:bg-black group"
                                >
                                    CELIMAX 데모 시작하기
                                    <ChevronLeft className="w-5 h-5 inline-block ml-1 rotate-180 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'onboarding' && (
                        <>
                            <div className="px-8 py-2">
                                <h1 className="text-xl font-bold font-serif text-subak-dark">SubaK</h1>
                            </div>
                            <div className="flex-1 overflow-y-auto hide-scrollbar px-8 pb-8 pt-2">
                                <div className="mb-6">
                                    <h2 className="text-[32px] font-inter font-extrabold leading-[1.05] mb-2 text-subak-dark tracking-tight">
                                        Help us curate <br />
                                        <span className="text-subak-red">K-Beauty</span> for you.
                                    </h2>
                                    <p className="text-gray-400 text-sm leading-snug">
                                        We personalize your feed and discounts based on your profile.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <section>
                                        <h3 className="text-base font-bold text-subak-dark mb-3">What's your skin concern?</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['Acne & Blemishes', 'Dryness', 'Pores', 'Anti-aging'].map(item => (
                                                <SelectionButton key={item} label={item} isSelected={selections.concerns.includes(item)} onClick={() => toggleSelection('concerns', item)} />
                                            ))}
                                        </div>
                                    </section>
                                    <section>
                                        <h3 className="text-base font-bold text-subak-dark mb-3">Hair Type</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['Damaged', 'Frizzy', 'Oily Scalp'].map(item => (
                                                <SelectionButton key={item} label={item} isSelected={selections.hairType.includes(item)} onClick={() => toggleSelection('hairType', item)} />
                                            ))}
                                        </div>
                                    </section>
                                    <section>
                                        <h3 className="text-base font-bold text-subak-dark mb-3">Skin Type</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['Dry', 'Oily', 'Combination', 'Sensitive', 'Acne-prone'].map(item => (
                                                <SelectionButton key={item} label={item} isSelected={selections.skinType.includes(item)} onClick={() => toggleSelection('skinType', item)} />
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                <div className="mt-8 flex flex-col items-center gap-4">
                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                                        <Lock className="w-3 h-3" />
                                        <span>Your data is used for personalization only.</span>
                                    </div>
                                    <button onClick={() => setStep('connecting')} className="w-full py-3.5 bg-subak-red text-white rounded-2xl font-bold text-base shadow-lg shadow-subak-red/20 hover:bg-subak-red/90 transition-colors transform active:scale-[0.98]">
                                        Start Exploring
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {step === 'connecting' && (
                        <div className="flex flex-col items-center justify-center px-10 animate-pulse-slow">
                            <div className="flex items-center gap-6 mb-10">
                                <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-gray-100 flex items-center justify-center bg-black">
                                    <img src="/tiktok-logo.png" alt="TikTok" className="w-full h-full object-cover" />
                                </div>
                                <ArrowLeftRight className="w-8 h-8 text-gray-300" />
                                <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-gray-100 flex items-center justify-center">
                                    <img src="/subak-seed.png" alt="SubaK" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-center leading-tight tracking-tight text-subak-dark">
                                Connecting <br />
                                TikTok account <br />
                                with subaK
                            </h2>
                        </div>
                    )}

                    {(step === 'store' || (step === 'splash' && isExitingSplash)) && (
                        <div className={`flex-1 flex flex-col bg-white ${isExitingSplash ? 'animate-in fade-in slide-in-from-bottom-20 duration-500' : ''}`}>
                            {/* Main App Header */}
                            <header className="bg-subak-red pl-8 pr-6 py-4 flex items-center justify-between shrink-0">
                                <h1 className="text-xl font-bold font-serif text-white">SubaK</h1>
                                <div className="flex items-center gap-4">
                                    <button className="p-1">
                                        <img src="/gift-icon.png" alt="Gift" className="w-[22px] h-[22px] brightness-200" />
                                    </button>
                                    <button className="p-1">
                                        <img src="/notification-icon.png" alt="Notification" className="w-[22px] h-[22px] brightness-200" />
                                    </button>
                                    <button className="p-1">
                                        <img src="/search-icon.png" alt="Search" className="w-[22px] h-[22px] brightness-200" />
                                    </button>
                                </div>
                            </header>

                            {/* Filter Section */}
                            <div className="bg-white px-8 py-2.5 shadow-[0_4px_10px_-4px_rgba(0,0,0,0.08)] z-10 flex flex-col gap-2 shrink-0">
                                {/* Top Row */}
                                <div className="flex gap-2 overflow-x-auto hide-scrollbar shrink-0">
                                    <button className="bg-[#111111] text-white px-5 py-1 rounded-full text-[13px] font-bold whitespace-nowrap">Concern</button>
                                    <button className="bg-white border border-gray-100 text-[#444444] px-5 py-1 rounded-full text-[13px] font-semibold whitespace-nowrap">Catecory</button>
                                    <button className="bg-white border border-gray-100 text-[#444444] px-5 py-1 rounded-full text-[13px] font-semibold whitespace-nowrap">Best</button>
                                    <button className="bg-white border border-gray-100 text-[#444444] px-5 py-1 rounded-full text-[13px] font-semibold whitespace-nowrap">Trending</button>
                                </div>
                                {/* Bottom Row */}
                                <div className="flex gap-2 overflow-x-auto hide-scrollbar shrink-0">
                                    <button className="bg-[#111111] text-white px-5 py-1 rounded-full text-[13px] font-bold whitespace-nowrap">All</button>
                                    <button className="bg-white border border-gray-100 text-[#444444] px-5 py-1 rounded-full text-[13px] font-semibold whitespace-nowrap">Acne Care</button>
                                    <button className="bg-white border border-gray-100 text-[#444444] px-5 py-1 rounded-full text-[13px] font-semibold whitespace-nowrap">Hydration</button>
                                    <button className="bg-white border border-gray-100 text-[#444444] px-5 py-1 rounded-full text-[13px] font-semibold whitespace-nowrap">Pore Care</button>
                                </div>
                            </div>

                            {/* Product List Grid */}
                            <div className="flex-1 bg-[#F5F5F7] overflow-y-auto hide-scrollbar pt-[6px]">
                                <div className="grid grid-cols-2 gap-[6px]">
                                    {/* First Product Card */}
                                    <div className="bg-white aspect-[1/1.45] flex flex-col">
                                        <div className="relative h-[65%] bg-white flex items-center justify-center p-4 overflow-hidden">
                                            <div className="absolute top-3 left-3 bg-[#111111] text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10">10% Cashback</div>
                                            <img src="/product-celimax.png" alt="Product" className="w-full h-full object-contain transform scale-[1.3]" />
                                        </div>
                                        <div className="h-[35%] px-3 pt-1.5 pb-[10px] flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-[11px] leading-tight text-[#111111] font-medium line-clamp-2">celimax Ji.Woo.Gae Heartleaf BHA Peeling Pad</h3>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className="text-[14px] font-bold text-[#111111]">$18.90</span>
                                                    <span className="text-[11px] text-gray-400 line-through">$21.00</span>
                                                </div>
                                            </div>
                                            <div className="mt-auto">
                                                <p className="text-[9px] font-bold text-subak-red tracking-tight">WITH REVIEW REWARD</p>
                                                <p className="text-[14px] font-bold text-subak-red -mt-0.5">$6.30</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Second Product Card - Highlighted for Demo */}
                                    <div
                                        className="bg-white aspect-[1/1.45] flex flex-col active:opacity-90 transition-all cursor-pointer relative border-2 border-[#FF6B81] animate-pulse-ring rounded-xl overflow-hidden"
                                        onClick={() => setStep('product-detail')}
                                    >
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                                            <div className="bg-[#FF6B81] text-white text-[12px] font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                                                Click
                                            </div>
                                        </div>
                                        <div className="relative h-[65%] bg-white flex items-center justify-center p-4 overflow-hidden">
                                            <div className="absolute top-3 left-3 bg-[#111111] text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10">15% Cashback</div>
                                            <img src="/product-vita-a.png" alt="Product" className="w-full h-full object-contain transform scale-[1.3]" />
                                        </div>
                                        <div className="h-[35%] px-3 pt-1.5 pb-[10px] flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-[11px] leading-tight text-[#111111] font-medium line-clamp-2">celimax The Vita A Retinal Shot Tightening Booster</h3>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className="text-[14px] font-bold text-[#111111]">$15.27</span>
                                                    <span className="text-[11px] text-gray-400 line-through">$17.97</span>
                                                </div>
                                            </div>
                                            <div className="mt-auto">
                                                <p className="text-[9px] font-bold text-subak-red tracking-tight">WITH REVIEW REWARD</p>
                                                <p className="text-[14px] font-bold text-subak-red -mt-0.5">$5.39</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Third Product Card */}
                                    <div className="bg-white aspect-[1/1.45] flex flex-col">
                                        <div className="relative h-[65%] bg-white flex items-center justify-center p-4 overflow-hidden">
                                            <div className="absolute top-3 left-3 bg-[#111111] text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10">17% Cashback</div>
                                            <img src="/product-noni.png" alt="Product" className="w-full h-full object-contain transform scale-[1.3]" />
                                        </div>
                                        <div className="h-[35%] px-3 pt-1.5 pb-[10px] flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-[11px] leading-tight text-[#111111] font-medium line-clamp-2">celimax Noni Energy Ampoule 50ml</h3>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className="text-[14px] font-bold text-[#111111]">$29.05</span>
                                                    <span className="text-[11px] text-gray-400 line-through">$35.00</span>
                                                </div>
                                            </div>
                                            <div className="mt-auto">
                                                <p className="text-[9px] font-bold text-subak-red tracking-tight">WITH REVIEW REWARD</p>
                                                <p className="text-[14px] font-bold text-subak-red -mt-0.5">$10.50</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fourth Product Card */}
                                    <div className="bg-white aspect-[1/1.45] flex flex-col">
                                        <div className="relative h-[65%] bg-white flex items-center justify-center p-4 overflow-hidden">
                                            <div className="absolute top-3 left-3 bg-[#111111] text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10">15% Cashback</div>
                                            <img src="/product-brightening-pad.png" alt="Product" className="w-full h-full object-contain transform scale-[1.04]" />
                                        </div>
                                        <div className="h-[35%] px-3 pt-1.5 pb-[10px] flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-[11px] leading-tight text-[#111111] font-medium line-clamp-2">celimax Pore+Dark Spot Brightening Pad</h3>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className="text-[14px] font-bold text-[#111111]">$17.42</span>
                                                    <span className="text-[11px] text-gray-400 line-through">$20.49</span>
                                                </div>
                                            </div>
                                            <div className="mt-auto">
                                                <p className="text-[9px] font-bold text-subak-red tracking-tight">WITH REVIEW REWARD</p>
                                                <p className="text-[14px] font-bold text-subak-red -mt-0.5">$6.15</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Navigation Bar */}
                            <nav className="bg-white border-t border-gray-100 h-[80px] px-8 shadow-[0_-8px_30px_rgb(0,0,0,0.06)] flex items-center justify-between shrink-0 z-50">
                                <button className="flex flex-col items-center opacity-40">
                                    <img src="/nav-home.png" alt="Home" className="w-[60px] h-auto" />
                                </button>
                                <button onClick={() => setStep('store')} className="flex flex-col items-center">
                                    <img src="/nav-store-new.png" alt="Store" className="w-[60px] h-auto" />
                                </button>
                                <button className="flex flex-col items-center opacity-40">
                                    <img src="/nav-wish.png" alt="Wishlist" className="w-[60px] h-auto" />
                                </button>
                                <button onClick={() => setStep('profile')} className="flex flex-col items-center opacity-40">
                                    <img src="/nav-my-new.png" alt="My" className="w-[60px] h-auto" />
                                </button>
                            </nav>
                        </div>
                    )}

                    {step === 'product-detail' && (
                        <div className="absolute inset-0 bg-white z-[60] flex flex-col animate-in slide-in-from-right duration-300">
                            {/* Header Image Slider */}
                            <div className="flex-1 overflow-y-auto hide-scrollbar pb-32">
                                <div className="relative w-full aspect-[1/0.8] bg-[#F5F5F7]">
                                    <div className="absolute top-[26px] left-[26px] z-20">
                                        <button
                                            onClick={() => setStep('store')}
                                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
                                        >
                                            <ChevronLeft className="w-6 h-6 text-gray-800" />
                                        </button>
                                    </div>
                                    {/* Brand Logo Overlay */}
                                    <div className="absolute bottom-6 left-6 z-20 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                                        <span className="font-bold text-xs tracking-tight">celimax</span>
                                    </div>
                                    {/* Image Carousel (Horizontal Scroll) */}
                                    <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar h-full">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="min-w-full h-full snap-center flex items-center justify-center bg-gray-50">
                                                <img src="/detail-main.png" alt="Detail" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    {/* Dots Indicator */}
                                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
                                        <div className="w-2 h-2 rounded-full bg-[#FF6B81]"></div>
                                        <div className="w-2 h-2 rounded-full bg-black/10"></div>
                                        <div className="w-2 h-2 rounded-full bg-black/10"></div>
                                        <div className="w-2 h-2 rounded-full bg-black/10"></div>
                                        <div className="w-2 h-2 rounded-full bg-black/10"></div>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="px-6 pt-5 pb-6">
                                    <h1 className="text-2xl font-bold text-[#111111] mb-1">The Vita A Retinal Shot</h1>
                                    <p className="text-gray-500 text-sm">Anti-Aging & Pore Minimizer</p>
                                </div>

                                {/* Price Offer Box */}
                                <div className="mx-6 bg-[#FFF0F0] rounded-2xl p-5 border border-[#FFE5E5]">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <p className="font-bold text-[#111111]">Price offer</p>
                                            <p className="text-[#FF6B81] font-bold text-sm">Instant 15% cashback</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-400 line-through text-sm">Retail $17.97</p>
                                            <p className="text-[#FF6B81] font-bold text-2xl">$15.27</p>
                                        </div>
                                    </div>
                                    {/* Dotted Line */}
                                    <div className="border-t border-dashed border-[#FFC2C2] my-3"></div>
                                    <div className="flex items-center justify-between mt-3">
                                        <div>
                                            <p className="font-bold text-[#111111]">Sharing Experience</p>
                                            <p className="text-[#FF6B81] font-bold text-sm">Additional 55% cashback</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[#FF6B81]/70 text-[10px] mb-0.5">with Review Cashback</p>
                                            <p className="text-[#FF6B81] font-bold text-2xl">$3.56</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Experience Section */}
                                <div className="mt-6 px-6">
                                    <h2 className="text-lg font-bold text-[#111111] mb-2">Experience</h2>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex -space-x-3">
                                            <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden"><img src="/reviewer-3.png" className="w-full h-full object-cover" /></div>
                                            <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 overflow-hidden"><img src="/reviewer-2.png" className="w-full h-full object-cover" /></div>
                                            <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-400 overflow-hidden"><img src="/reviewer-1.png" className="w-full h-full object-cover" /></div>
                                        </div>
                                        <span className="font-bold text-gray-500 ml-2">200+</span>
                                    </div>

                                    {/* Video Feed (Horizontal Scroll) */}
                                    <div
                                        ref={videoFeedRef}
                                        onMouseDown={handleMouseDown}
                                        onMouseLeave={handleMouseLeave}
                                        onMouseUp={handleMouseUp}
                                        onMouseMove={handleMouseMove}
                                        className={`flex overflow-x-auto gap-3 pb-4 snap-x hide-scrollbar cursor-grab ${isDragging ? 'cursor-grabbing select-none active:snap-none' : ''}`}
                                        style={{ scrollSnapType: isDragging ? 'none' : 'x mandatory' }}
                                    >
                                        {[
                                            "7555444203593944323",
                                            "7559834740413435144",
                                            "7390330526239853842"
                                        ].map((id, index) => (
                                            <div key={id} className="min-w-[48%] snap-start">
                                                <div className="aspect-[9/16] rounded-2xl overflow-hidden relative shadow-md bg-black">
                                                    <iframe
                                                        src={`https://www.tiktok.com/player/v1/${id}?music_info=1&description=1&cookie_banner=1`}
                                                        className="absolute inset-0 w-full h-full border-0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    <span className="px-2 py-0.5 rounded-full border border-gray-200 text-[10px] text-gray-500">Pore Minimize</span>
                                                    <span className="px-2 py-0.5 rounded-full border border-gray-200 text-[10px] text-gray-500">{index === 0 ? 'Wrinkle removal' : 'Retinal'}</span>
                                                </div>
                                                <p className="text-[11px] font-bold leading-tight mt-1.5 line-clamp-2">
                                                    100+ people watched this video and decided to buy
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sticky Bottom Bar */}
                            <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 p-6 pt-4 pb-8 z-30 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                                <button
                                    onClick={() => setShowPurchaseModal(true)}
                                    className="w-full bg-[#FF6B81] text-white font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-[#FF6B81]/30 active:scale-[0.98] transition-transform"
                                >
                                    Buy on Amazon
                                </button>
                                <p className="text-center text-gray-400 text-[11px] mt-2.5">
                                    Don't forget to come back for cashback!
                                </p>
                            </div>
                        </div>
                    )}

                    {showPurchaseModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
                            {/* Backdrop */}
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setShowPurchaseModal(false)}></div>

                            {/* Modal Box */}
                            <div className="relative bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                                <button
                                    onClick={() => setShowPurchaseModal(false)}
                                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="p-8 pt-10">
                                    <div className="w-16 h-16 bg-[#F0FDF4] rounded-2xl flex items-center justify-center mb-6">
                                        <ExternalLink className="w-8 h-8 text-[#16A34A]" />
                                    </div>

                                    <h3 className="text-xl font-bold text-[#111111] mb-3 leading-tight">
                                        브랜드 구매 채널 전환 안내
                                    </h3>

                                    <div className="space-y-4 text-gray-500 text-[14px] leading-relaxed">
                                        <p>
                                            사용자가 버튼을 클릭하면, 브랜드가 지정한 <strong>공식 자사몰</strong>이나 <strong>아마존</strong> 등 실제 판매 페이지로 즉시 연결됩니다.
                                        </p>

                                        <div className="flex gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <div className="shrink-0 pt-0.5">
                                                <CheckCircle className="w-4 h-4 text-[#FF6B81]" />
                                            </div>
                                            <p className="text-xs text-gray-600">
                                                이후 발생하는 구매 데이터는 <strong>수박(subaK) 시스템에서 자동으로 트래킹</strong>되며, 이를 통해 리뷰 업로드 시 리워드 캐시백이 명확히 지급됩니다.
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setShowPurchaseModal(false);
                                            setStep('amazon-simulation');
                                            // Reset cursor states
                                            setShowVirtualCursor(false);
                                            setCursorPos({ x: '50%', y: '50%' }); // Start at center
                                        }}
                                        className="w-full bg-[#111111] text-white font-bold py-4 rounded-xl mt-8 hover:bg-black transition-colors"
                                    >
                                        데모 유저 플로우 계속하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'amazon-simulation' && (
                        <div className="absolute inset-0 bg-black z-[110] flex flex-col animate-in fade-in duration-500">
                            {/* Header overlay for simulation control */}
                            <div className="absolute top-6 left-6 z-20">
                                <button
                                    onClick={() => setStep('product-detail')}
                                    className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-95 transition-transform border border-white/20"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Video Container */}
                            <div className="flex-1 w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
                                <video
                                    ref={simulationVideoRef}
                                    src="/simulation-video.mp4"
                                    className="w-full h-full object-contain"
                                    autoPlay
                                    muted
                                    playsInline
                                    onPlay={() => {
                                        setTimeout(() => {
                                            if (simulationVideoRef.current) {
                                                simulationVideoRef.current.pause();

                                                // Start Virtual Cursor Sequence
                                                setTimeout(() => {
                                                    setShowVirtualCursor(true);
                                                    setTimeout(() => {
                                                        // Move to 'Buy Now' button position
                                                        setCursorPos({ x: '50%', y: '84%' });

                                                        setTimeout(() => {
                                                            setIsVirtualClicking(true);
                                                            setTimeout(() => {
                                                                setIsVirtualClicking(false);
                                                                // Transition to referral screen after 0.5s
                                                                setTimeout(() => {
                                                                    setStep('amazon-referral');
                                                                }, 500);
                                                            }, 300);
                                                        }, 1100); // Wait for movement duration
                                                    }, 500); // Delay before moving
                                                }, 500); // Delay after video pause
                                            }
                                        }, 5000);
                                    }}
                                    onError={(e) => console.log("Video Load Error: Please ensure simulation-video.mp4 is in the public folder")}
                                ></video>

                                {/* Virtual Cursor Overlay */}
                                {showVirtualCursor && (
                                    <div
                                        className="absolute z-[120] pointer-events-none transition-all duration-1000 ease-in-out"
                                        style={{
                                            left: cursorPos.x,
                                            top: cursorPos.y,
                                            transform: `translate(-50%, -50%) scale(${isVirtualClicking ? 0.8 : 1})`
                                        }}
                                    >
                                        <div className="relative">
                                            <MousePointer2 className="w-8 h-8 text-black fill-white shadow-lg rotate-[-15deg]" />
                                            {isVirtualClicking && (
                                                <div className="absolute inset-0 bg-white/40 rounded-full animate-ping"></div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {step === 'amazon-referral' && (
                        <div className="absolute inset-0 bg-white z-[110] flex flex-col animate-in fade-in duration-500">
                            {/* Browser Header Overlay */}
                            <div className="px-6 pt-6 pb-2">
                                <div className="bg-[#F2F2F2] rounded-xl py-2.5 px-4 flex items-center justify-center gap-2">
                                    <Lock className="w-3 h-3 text-gray-400" />
                                    <span className="text-[12px] text-gray-500 font-medium tracking-tight">amazon.com/anua-toner</span>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col items-center justify-center px-8 pb-32">
                                {/* Amazon Logo Section */}
                                <div className="text-center mb-16">
                                    <h2 className="text-[42px] font-bold text-[#FF9900] leading-none mb-1">amazon</h2>
                                    <p className="text-gray-500 text-lg font-medium">(External Shopping Mall)</p>
                                </div>

                                {/* Referral Card */}
                                <div className="w-full bg-white border border-gray-100 rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] text-center">
                                    <p className="text-[#111111] text-xl font-bold mb-8">15% cashback available</p>

                                    <button
                                        onClick={() => setStep('purchase-verification')}
                                        className="w-full bg-[#FF9900] text-[#111111] font-bold py-4 rounded-xl text-lg shadow-lg shadow-[#FF9900]/20 active:scale-[0.98] transition-all"
                                    >
                                        back to SubaK
                                    </button>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setStep('product-detail')}
                                className="absolute top-6 left-6 p-2 text-gray-400"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    )}

                    {step === 'purchase-verification' && (
                        <div className="absolute inset-0 bg-white z-[110] flex flex-col animate-in fade-in duration-300 overflow-y-auto hide-scrollbar">
                            <div className="p-6 pt-12 pb-32">
                                <h1 className="text-[28px] font-bold text-[#111111] mb-6">Did you buy it?</h1>

                                {/* Product Card */}
                                <div className="bg-white rounded-3xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 mb-10 flex gap-4 items-center">
                                    <div className="w-20 h-20 shrink-0 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
                                        <img src="/product-vita-a.png" className="w-full h-full object-contain p-1" alt="Product" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-[#111111] text-white text-[10px] font-bold px-2 py-1 rounded-md inline-block mb-1">
                                            15% Cashback
                                        </div>
                                        <h3 className="text-sm font-medium text-gray-900 leading-tight mb-1">
                                            celimax The Vita A Retinal Shot Tightening Booster
                                        </h3>
                                        <p className="text-[#FF6B81] font-bold text-sm">
                                            $2.69 cashback available
                                        </p>
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold text-[#111111] mb-4">Who inspired you?</h2>

                                {/* Search Bar */}
                                <div className="relative mb-6">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search someone who inspired you"
                                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#FF6B81]"
                                    />
                                </div>

                                {/* Selected Influencer */}
                                <div className="bg-[#FFF0F3] border border-[#FF6B81]/30 rounded-2xl p-4 flex items-center gap-3 mb-6 relative">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white shadow-sm">
                                        <img src="/reviewer-1.png" className="w-full h-full object-cover" alt="Influencer" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#111111] text-sm">@bcninelka</p>
                                        <p className="text-gray-500 text-xs">Watched recently</p>
                                    </div>
                                    <div className="absolute right-4 w-3 h-3 bg-[#FF6B81] rounded-full"></div>
                                </div>

                                {/* Influencer Content Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Item 1 - Selected */}
                                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-[3px] border-[#FF6B81] shadow-lg shadow-[#FF6B81]/20">
                                        <img src="/reviewer-1.png" className="w-full h-full object-cover" alt="Content" />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/40"></div>
                                        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white font-bold text-sm">
                                            <Play className="w-3 h-3 fill-white" /> 1.9M
                                        </div>
                                        <div className="absolute top-3 left-3 w-8 h-8 rounded-full border border-white/50 overflow-hidden">
                                            <img src="/reviewer-1.png" className="w-full h-full object-cover" />
                                        </div>
                                    </div>

                                    {/* Item 2 - Other */}
                                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
                                        <img src="/reviewer-2.png" className="w-full h-full object-cover opacity-90" alt="Content" />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/40"></div>
                                        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white font-bold text-sm">
                                            <Play className="w-3 h-3 fill-white" /> 1M
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sticky Bottom Bar */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
                                <button
                                    onClick={() => setShowCashbackInfoModal(true)}
                                    className="w-full bg-[#FF6B81] text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-[#FF6B81]/30 active:scale-[0.98] transition-all"
                                >
                                    Claim Cashback
                                </button>
                            </div>
                        </div>
                    )}

                    {showCashbackInfoModal && (
                        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 animate-in fade-in duration-300">
                            {/* Backdrop */}
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowCashbackInfoModal(false)}></div>

                            {/* Modal Box */}
                            <div className="relative bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                                <button
                                    onClick={() => setShowCashbackInfoModal(false)}
                                    className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="p-8 pt-10">
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B81] to-[#FF8F9C] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#FF6B81]/20">
                                        <CheckCircle className="w-7 h-7 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-[#111111] mb-2 leading-tight">
                                        구매 보장형 마케팅 솔루션
                                    </h3>
                                    <p className="text-gray-400 text-xs font-medium mb-8 uppercase tracking-wider">For Brand Manager</p>

                                    <div className="space-y-6">
                                        {/* Section 1: User Flow */}
                                        <div>
                                            <h4 className="text-sm font-bold text-[#111111] mb-3 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B81]"></div>
                                                2단계 리워드 시스템
                                            </h4>
                                            <div className="bg-gray-50 rounded-2xl p-4 text-[13px] text-gray-600 space-y-3 leading-relaxed border border-gray-100">
                                                <p>
                                                    <span className="font-bold text-[#111111] block mb-0.5">Step 1. Basic Cashback (10~20%)</span>
                                                    구매 확정 시 즉시 지급됩니다. 사용자는 이때 구매 결정에 영향을 준 콘텐츠를 직접 선택합니다.
                                                </p>
                                                <div className="h-px bg-gray-200"></div>
                                                <p>
                                                    <span className="font-bold text-[#111111] block mb-0.5">Step 2. Second Payback (30~60%)</span>
                                                    제품 수령 후 영상 리뷰를 업로드하면 추가로 지급되는 파격적인 혜택입니다.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Section 2: Brand Value */}
                                        <div>
                                            <h4 className="text-sm font-bold text-[#111111] mb-3 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#111111]"></div>
                                                브랜드 제공 가치
                                            </h4>
                                            <ul className="text-[13px] text-gray-600 space-y-2 leading-relaxed list-disc list-outside pl-4">
                                                <li>
                                                    <strong className="text-[#111111]">No-Risk 콘텐츠 수급:</strong> 구매와 리뷰라는 확실한 성과 기반으로 고퀄리티 UGC를 확보합니다.
                                                </li>
                                                <li>
                                                    <strong className="text-[#111111]">데이터 인사이트:</strong> 실구매자 특성, 구매 데이터, 그리고 전환을 일으키는 핵심 콘텐츠(Attribution) 데이터를 제공합니다.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setShowCashbackInfoModal(false);
                                            setStep('profile');
                                        }}
                                        className="w-full bg-[#111111] text-white font-bold py-4 rounded-xl mt-8 hover:bg-black transition-colors"
                                    >
                                        프로필로 이동
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'profile' && (
                        <div className="absolute inset-0 bg-[#2C3E50] z-50 flex flex-col animate-in fade-in duration-300">
                            {/* Header Section */}
                            <div className="px-6 pt-12 pb-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                                            <img src="/reviewer-1.png" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-base">@skincare_sarah</p>
                                            <p className="text-[#FF6B81] text-xs font-bold">tier 3</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                            <ExternalLink className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                            <Lock className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Cashback Card */}
                                <div className="bg-[#1a252f] rounded-3xl p-4 mb-4 relative overflow-hidden">
                                    <div className="absolute top-4 right-4">
                                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                            <ArrowLeftRight className="w-4 h-4 text-white rotate-90" />
                                        </div>
                                    </div>
                                    <p className="text-white/60 text-sm mb-2">Cashback amount</p>
                                    <h2 className="text-white text-[34px] font-bold leading-none">$2.69</h2>
                                </div>

                                {/* Earning Card */}
                                <div className="bg-[#0f1419] rounded-3xl p-4 mb-4 relative overflow-hidden">
                                    <div className="absolute top-4 right-4">
                                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                            <ArrowLeftRight className="w-4 h-4 text-white rotate-90" />
                                        </div>
                                    </div>
                                    <p className="text-white/60 text-sm mb-2">Earning from sharing Experience</p>
                                    <h2 className="text-white text-[34px] font-bold leading-none">$68.97</h2>
                                </div>

                                {/* Total & Claim */}
                                <div className="flex gap-3">
                                    <div className="flex-1 bg-[#3d4f5f] rounded-2xl p-3">
                                        <p className="text-white/60 text-xs mb-1">Total</p>
                                        <p className="text-white text-lg font-bold">$71.66</p>
                                    </div>
                                    <button className="flex-1 bg-[#FF6B81] rounded-2xl p-3 flex flex-col items-center justify-center shadow-lg shadow-[#FF6B81]/20 active:scale-[0.98] transition-transform">
                                        <p className="text-white text-xs font-medium mb-0.5">Claim</p>
                                        <p className="text-white text-lg font-bold">Available</p>
                                    </button>
                                </div>
                            </div>

                            {/* Available Action Section */}
                            <div className="flex-1 bg-white rounded-t-[32px] px-6 pt-6 pb-24 overflow-y-auto hide-scrollbar">
                                <h3 className="text-[#111111] font-bold text-xl mb-4">Available action</h3>

                                {/* Action Card */}
                                <div className="border-2 border-[#FF6B81] rounded-3xl p-6 bg-white">
                                    <div className="flex items-start justify-between mb-4">
                                        <h4 className="text-[#111111] font-bold text-lg">Celimax Retinal Shot</h4>
                                        <span className="bg-[#FFE5EA] text-[#FF6B81] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">Action Required</span>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-1">
                                        Upload your TikTok review to unlock the
                                    </p>
                                    <p className="text-gray-600 text-sm mb-6">
                                        remaining <span className="font-bold text-[#111111]">$9.88</span> (55% off effect).
                                    </p>

                                    <input
                                        type="text"
                                        placeholder="Paste TikTok Link Here"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-4 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#FF6B81] mb-4"
                                    />

                                    <button className="w-full bg-[#FF6B81] text-white font-bold py-4 rounded-xl text-base shadow-lg shadow-[#FF6B81]/20 active:scale-[0.98] transition-transform">
                                        Submit Link
                                    </button>
                                </div>
                            </div>

                            {/* Bottom Navigation Bar */}
                            <nav className="bg-white border-t border-gray-100 h-[80px] px-8 shadow-[0_-8px_30px_rgb(0,0,0,0.06)] flex items-center justify-between shrink-0 z-50">
                                <button className="flex flex-col items-center opacity-40">
                                    <img src="/nav-home.png" alt="Home" className="w-[60px] h-auto" />
                                </button>
                                <button onClick={() => setStep('store')} className="flex flex-col items-center opacity-40">
                                    <img src="/nav-store-new.png" alt="Store" className="w-[60px] h-auto" />
                                </button>
                                <button className="flex flex-col items-center opacity-40">
                                    <img src="/nav-wish.png" alt="Wishlist" className="w-[60px] h-auto" />
                                </button>
                                <button onClick={() => setStep('profile')} className="flex flex-col items-center">
                                    <img src="/nav-my-new.png" alt="My" className="w-[60px] h-auto" />
                                </button>
                            </nav>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default App;

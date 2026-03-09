import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { BookOpen, FileText, Download, Target, GraduationCap, Clock, Scale, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Animation Variants ---
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const mechanicalReveal = {
    hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    visible: { opacity: 1, clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

// --- Helper Components ---
const SectionHeading = ({ title, subtitle }) => (
    <div className="mb-12 relative">
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-orange-600 rounded-full" />
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{title}</h2>
        {subtitle && <p className="text-slate-500 mt-2 text-lg">{subtitle}</p>}
    </div>
);

const RegulationCard = ({ icon: Icon, title, description, badge, link }) => (
    <motion.div variants={fadeInUp}>
        <a
            href={link}
            className="group block relative h-full bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-slate-200/80 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 overflow-hidden"
        >
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {badge && (
                <span className="absolute top-6 right-6 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full">
                    {badge}
                </span>
            )}

            <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Icon size={28} strokeWidth={2} />
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-orange-600 transition-colors">
                    {title}
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6 flex-1">
                    {description}
                </p>

                <div className="flex items-center text-orange-600 font-semibold text-sm mt-auto pt-4 border-t border-slate-100">
                    <Download size={16} className="mr-2" />
                    Download PDF
                    <span className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        &rarr;
                    </span>
                </div>
            </div>
        </a>
    </motion.div>
);

const KeyRuleItem = ({ icon: Icon, title, text }) => (
    <div className="flex gap-4">
        <div className="mt-1 w-10 h-10 shrink-0 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
            <Icon size={20} />
        </div>
        <div>
            <h4 className="font-bold text-slate-800 mb-1">{title}</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
        </div>
    </div>
);

// --- Main Pages ---
const Regulations = () => {
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const yParallax = useTransform(smoothProgress, [0, 1], [0, -100]);

    return (
        <div className="min-h-screen bg-slate-50 text-[#1f2937] font-sans selection:bg-[#b45309] selection:text-white overflow-hidden relative">
            {/* Scroll Progress Bar */}
            <motion.div style={{ scaleX: smoothProgress, transformOrigin: "0%" }} className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-[#b45309] z-[100]" />

            {/* --- BACKGROUND LAYER --- */}
            <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden bg-gradient-to-br from-slate-50 to-orange-50/15">
                <div className="absolute inset-0 opacity-[0.2] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]"></div>

                {/* Ambient Blurs */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] bg-gradient-to-br from-[#b45309]/[0.05] to-transparent rounded-full blur-[100px] transform-gpu"
                />
                <motion.div
                    animate={{ scale: [1, 1.25, 1], x: [0, -40, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 2 }}
                    className="absolute bottom-[5%] right-[-10%] w-[50vw] h-[50vw] bg-gradient-to-bl from-amber-500/[0.04] to-transparent rounded-full blur-[120px] transform-gpu"
                />
            </div>

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-24 border-b border-slate-200/80 bg-white/40 backdrop-blur-md">
                <div className="container relative z-20 mx-auto px-6 max-w-6xl">
                    <header className="mb-8">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-xl inline-flex pr-4 py-1.5 rounded-full border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                            <span className="px-3 py-1 bg-[#1f2937] text-white font-mono text-[10px] uppercase tracking-widest relative overflow-hidden rounded-full ml-1">
                                <motion.span animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute inset-0 w-1/2 bg-white/20 skew-x-12" />
                                Academics
                            </span>
                            <span className="font-semibold text-[13px] text-[#4b5563] pl-1 pr-2 uppercase tracking-wide">Department of Chemistry</span>
                        </motion.div>

                        <motion.h1 variants={mechanicalReveal} initial="hidden" animate="visible" className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-[#1f2937] mb-6 uppercase">
                            RULES &<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-[#b45309]">REGULATIONS</span>
                        </motion.h1>

                        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.2 }} className="text-lg md:text-xl font-medium text-[#4b5563] max-w-2xl leading-relaxed">
                            Comprehensive guidelines governing academic programs, student conduct, evaluations, and degree requirements at the Department of Chemistry.
                        </motion.p>
                    </header>
                </div>
            </section>

            <section className="relative">
                <div className="container mx-auto px-6 max-w-6xl py-12 md:py-24">
                    {/* Quick Links / Highlights */}
                    <div className="grid lg:grid-cols-3 gap-12 mb-20 md:mb-32">
                        <div className="lg:col-span-1">
                            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="sticky top-32">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Key Directives</h3>
                                <div className="space-y-8">
                                    <KeyRuleItem
                                        icon={Clock}
                                        title="Attendance Policy"
                                        text="A minimum of 85% attendance is mandatory for all credited courses to be eligible for end-semester examinations."
                                    />
                                    <KeyRuleItem
                                        icon={Target}
                                        title="Academic Integrity"
                                        text="Strict adherence to the honor code is required. Plagiarism or malpractice will result in severe disciplinary action."
                                    />
                                    <KeyRuleItem
                                        icon={GraduationCap}
                                        title="Credit Requirements"
                                        text="Students must fulfill all core, elective, and project credit requisites as specified in their respective program curriculum."
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-2">
                            <SectionHeading
                                title="Official Documents"
                                subtitle="Download the complete regulation manuals for your specific academic program."
                            />

                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid sm:grid-cols-2 gap-6"
                            >
                                <RegulationCard
                                    icon={BookOpen}
                                    title="BS+MS Dual Degree"
                                    description="Complete curriculum rules, promotion criteria, and project guidelines for the integrated 5-year program."
                                    badge="Latest (2023)"
                                    link="#"
                                />

                                <RegulationCard
                                    icon={FileText}
                                    title="MSc Program"
                                    description="Regulations governing the 2-year Master of Science structure, coursework, and thesis evaluation."
                                    badge="Updated 2022"
                                    link="#"
                                />

                                <RegulationCard
                                    icon={GraduationCap}
                                    title="PhD Program"
                                    description="Comprehensive manual covering comprehensive exams, research progress committees, and thesis submission."
                                    badge="Updated 2023"
                                    link="#"
                                />

                                <RegulationCard
                                    icon={Scale}
                                    title="Institute Honor Code"
                                    description="The overarching principles of academic honesty and disciplinary procedures applicable to all students."
                                    badge="General"
                                    link="#"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden border border-slate-200/60 shadow-xl shadow-slate-200/20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-white to-transparent opacity-80" />

                        {/* Decorative bubbles */}
                        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-orange-100/50 rounded-full blur-3xl mix-blend-multiply" />
                        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-40 h-40 bg-amber-100/50 rounded-full blur-3xl mix-blend-multiply" />

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20 text-white transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                                <HelpCircle size={32} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Need Clarification?</h3>
                            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                                If you have specific doubts regarding academic policies, course registrations, or credit transfers, please reach out to the Department Office.
                            </p>
                            <Link to="/contact/contact-us" className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 hover:scale-[1.02] active:scale-[0.98] rounded-full transition-all duration-300 shadow-xl shadow-orange-500/25 focus:outline-none focus:ring-4 focus:ring-orange-500/30">
                                Contact Department Office
                                <span className="ml-2 font-bold opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                                    &rarr;
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Regulations;

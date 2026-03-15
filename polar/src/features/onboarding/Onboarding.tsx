import {useTranslation} from 'react-i18next';
import {ProfileType} from "../../core/type.ts";

interface OnboardingProps {
    onProfileSelected: (type: ProfileType) => void;
}

export default function Onboarding({onProfileSelected}: OnboardingProps) {
    const {t} = useTranslation();

    return (
        <div className="min-h-screen bg-isabelline dark:bg-gh-bg flex flex-col items-center justify-center p-6 transition-colors duration-300">

            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-smoky dark:text-gh-text tracking-tight transition-colors">
                    {t('ONBOARDING.TITLE')}
                </h1>
                <p className="text-lg text-smoky dark:text-gh-muted opacity-70 dark:opacity-100 mt-2 transition-colors">
                    {t('ONBOARDING.SUBTITLE')}
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full justify-center">

                <button
                    onClick={() => onProfileSelected(ProfileType.PERSONAL)}
                    className="group relative flex-1 bg-white dark:bg-gh-surface p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-left border-2 border-transparent dark:border-gh-border hover:border-sunglow dark:hover:border-gh-accent text-smoky dark:text-gh-text"
                >
                    <div className="w-12 h-12 rounded-full bg-sunglow dark:bg-gh-accent/20 dark:border dark:border-gh-accent/50 flex items-center justify-center mb-6 shadow-sm transition-colors"></div>
                    <h2 className="text-2xl font-bold mb-3">{t('ONBOARDING.PERSONAL_TITLE')}</h2>
                    <p className="opacity-80 dark:opacity-100 dark:text-gh-muted leading-relaxed transition-colors">
                        {t('ONBOARDING.PERSONAL_DESC')}
                    </p>
                </button>

                <button
                    onClick={() => onProfileSelected(ProfileType.STORE)}
                    className="group relative flex-1 bg-white dark:bg-gh-surface p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-left border-2 border-transparent dark:border-gh-border hover:border-sunglow dark:hover:border-gh-accent text-smoky dark:text-gh-text"
                >
                    <div className="w-12 h-12 rounded-full bg-sunglow dark:bg-gh-accent/20 dark:border dark:border-gh-accent/50 flex items-center justify-center mb-6 shadow-sm transition-colors"></div>
                    <h2 className="text-2xl font-bold mb-3">{t('ONBOARDING.STORE_TITLE')}</h2>
                    <p className="opacity-80 dark:opacity-100 dark:text-gh-muted leading-relaxed transition-colors">
                        {t('ONBOARDING.STORE_DESC')}
                    </p>
                </button>

            </div>
        </div>
    );
}
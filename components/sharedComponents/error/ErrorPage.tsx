"use client"
import { useTranslations } from 'next-intl'
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {  MdRefresh } from 'react-icons/md';

interface Props {
    title?: string;
    description: string;
    error:{
        message:string;
        status:number;
    },
    icon?:React.ReactNode
}

const ErrorPage = ({ error,title, description,icon }: Props) => {
    const t = useTranslations();
    const router = useRouter();
    const [isRetrying, setIsRetrying] = useState(false);

    const handleRetry = async () => {
        setIsRetrying(true);
        setTimeout(() => {
            router.refresh();
            setIsRetrying(false)
        }, 1000);
    };

    if(error.status == 404){
        redirect("/not-found")
    }

    return (
        <div className="container grid items-center">
            <div className="min-h-[60vh] mx-auto grid place-items-center text-center px-8">
                <div className="flex flex-col items-center justify-center w-full text-text">
                    {icon? icon :<h3 className='text-4xl md:text-6xl text-error-300'>{error.status}</h3>}
                    <h5 className="mt-4 text-lg !leading-snug md:text-3xl font-semibold">
                        {title ? t(title):error.message}
                    </h5>
                    {description && (
                        <p className="mt-4 mb-8 text-base md:text-base font-semibold  mx-auto md:max-w-sm">
                            {t(description)} 
                        </p>
                    )}
                    <button 
                        className={`app-btn btn-primary mt-4 px-5 !py-4`}
                        onClick={handleRetry}
                        disabled={isRetrying}
                    >
                        <MdRefresh className={`w-5 h-5 ${isRetrying ? 'animate-spin' : ''}`} />
                        {isRetrying ? `${t("buttons.trying")}..` : t("buttons.try_again")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
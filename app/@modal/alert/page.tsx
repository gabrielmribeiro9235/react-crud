"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Alert({ alertRef, alertMsg, closeAlert }: { alertRef: React.RefObject<HTMLDialogElement | null>, alertMsg: string, closeAlert: () => void}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const msg = searchParams.get("msg") || "algo aconteceu";

    return (
        <>
            <div className="fixed inset-0 bg-black/50"></div>
            <dialog
                open
                className="rounded-lg p-6 w-[400px] z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                <h2 className="text-xl mb-2">{msg}</h2>
                <button
                    className="mt-4 cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-80 active:scale-98"
                    onClick={() => router.back()}
                >
                    Fechar
                </button>
            </dialog>
        </>
    );
}
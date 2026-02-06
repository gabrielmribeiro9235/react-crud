import React from "react";

export default function Alert({ alertRef, alertMsg, closeAlert }: { alertRef: React.RefObject<HTMLDialogElement | null>, alertMsg: string, closeAlert: () => void}) {
    return (
        <dialog
            ref={alertRef}
            className="rounded-lg p-6 w-[400px] shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
            <h2 className="text-xl mb-2">{alertMsg}</h2>
            <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                onClick={closeAlert}
            >
                Fechar
            </button>
        </dialog>
    );
}
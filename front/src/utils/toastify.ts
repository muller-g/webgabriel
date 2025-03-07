import { Bounce, toast, ToastOptions } from "react-toastify";

const config: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
}

export const notify = (msg: string) => toast.success(msg, config);

export const notifyErr = () => toast.error('Erro, preencha todos os campos ou verifique o que esta sendo enviado', config);

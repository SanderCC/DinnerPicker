import {createContext, type ReactNode, useContext} from "react";
import {useSnackbar} from "notistack";

const NotificationContext = createContext<{
    success: (e: string) => void
    error: (e: string | unknown) => void
    warning: (e: string) => void
    info: (e: string) => void
}>({
    success: () => {
    },
    error: () => {
    },
    warning: () => {
    },
    info: () => {
    }
})

// eslint-disable-next-line react-refresh/only-export-components
export default function useNotifications() {
    return useContext(NotificationContext)
}

export function NotificationProvider(props: { children: ReactNode }) {
    const {enqueueSnackbar} = useSnackbar()

    const filterMsg = (msg: string) => `${msg}`.replace("Axios", "")
    const success = (msg: string) => enqueueSnackbar(filterMsg(msg), {variant: "success"})
    const error = (msg: unknown) => enqueueSnackbar(filterMsg(`${msg}`), {variant: "error"})
    const warning = (msg: string) => enqueueSnackbar(filterMsg(msg), {variant: "warning"})
    const info = (msg: string) => enqueueSnackbar(filterMsg(msg), {variant: "info"})


    return <NotificationContext.Provider value={{success, error, warning, info}}>
        {props.children}
    </NotificationContext.Provider>
}

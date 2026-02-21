import {useCallback, useEffect, useMemo, useState} from "react"
import {getObject} from "../functions/objectService";
import {useSnackbar} from "notistack";

export default function useGetSingle<T>(url: string, defaultValue: T, displayErrors: boolean = true) {
    const [loading, setIsLoading] = useState(true)
    const [hasLoaded, setHasLoaded] = useState(false)
    const [lastLoad, setLastLoad] = useState(new Date())
    const [errorMsg, setErrorMsg] = useState("")
    const [fetchedData, setFetchedData] = useState<T>(defaultValue)
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        if (errorMsg && displayErrors)
            enqueueSnackbar(errorMsg, {variant: "error"})
    }, [errorMsg, enqueueSnackbar, displayErrors]);

    const getData = useCallback(async () => {
        try {
            const {data} = await getObject<T>(url)
            setFetchedData(data)
            setErrorMsg(prev => prev.length > 0 ? "" : prev)
            setHasLoaded(prev => prev ? prev : true)
        } catch (error: unknown) {
            setErrorMsg(`${error}`.replace("Axios", "").trim())
            console.log("useGetSingle has thrown an error: " + error)
        } finally {
            setIsLoading(false)
            setLastLoad(new Date())
        }
    }, [url])

    useEffect(() => {
        getData()
    }, [getData, url]);

    const error = useMemo((): boolean => {
        return errorMsg.length > 0
    }, [errorMsg])

    const firstLoading = useMemo(() => {
        return !hasLoaded && loading
    }, [hasLoaded, loading])

    const refresh = useCallback(async () => {
        setIsLoading(true)
        await getData()
    }, [getData])

    return {loading, "data": fetchedData, refresh, error, errorMsg, lastLoad, hasLoaded, firstLoading}
}


export function useGetCollection<T>(url: string) {
    const response = useGetSingle<Array<T>>(url, [])
    return {...response, noData: response.data.length === 0}
}

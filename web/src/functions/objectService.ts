import axios, {type AxiosResponse} from "axios"

axios.defaults.baseURL = window.location.host.includes('localhost')
    ? `https://localhost:7043`
    : `https://backend.dinnerpicker.sanderc.net`

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export async function getObject<T>(path: string) {
    return await axios.get<T>(path)
}

export function asEntity<T>(entity: T) {
    return {entity}
}

export async function putObject<T>(path: string, entity: T) {
    return await axios.put<T>(path, entity)
}

export async function putObjectWithResponse<T, R>(path: string, entity: T) {
    return await axios.put<T, AxiosResponse<R>>(path, entity)
}

export async function postObject<T>(path: string, entity: T) {
    return await axios.post<T>(path, entity)
}

export async function postFile<T>(path: string, file: T) {
    return await axios.post<T>(path, {
        file
    }, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
}

export async function postEntity<T>(path: string, entity: T) {
    return await postObject(path, asEntity(entity))
}

export async function postEntityWithResponse<T, R>(path: string, entity: T) {
    return await postObjectWithResponse<{ entity: T }, R>(path, asEntity(entity))
}

export async function postObjectWithResponse<TReq, TRes>(path: string, entity: TReq) {
    return await axios.post<TRes, AxiosResponse<TRes>, TReq>(path, entity)
}

export async function deleteObject<T>(path: string) {
    return await axios.delete<T>(path)
}

"use client"

import React, {useEffect, useState} from "react";
import BaseLoader from "@/shared/components/loader/base.loader";

interface componentProps {
    apiAction: () => Promise<unknown>;
    children: React.ReactNode;
    loader: React.ReactNode;
}

enum Status {
    Loading,
    Loaded,
    Failed
}

export default function BaseLoaderApi({apiAction, children, loader}: componentProps) {

    const [status, setStatus] = useState<Status>(Status.Loading);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        callApi()
    }, [])

    const callApi = () => {
        setStatus(Status.Loading);
        apiAction().then(() => {
            setStatus(Status.Loaded);
            setLoaded(true);
        }).catch(() => {
            setStatus(Status.Failed)
        })
    }

    return (
        <BaseLoader loader={loader}
                    loading={status === Status.Loading}
                    loaded={loaded}
                    failed={!loaded && status === Status.Failed}
                    tryAgainAction={callApi}>
            {children}
        </BaseLoader>
    );
}
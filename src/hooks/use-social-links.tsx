import axiosClient from '@/configs/axios-client'
import React, { useEffect } from 'react'

export interface ISocialLink {
    id: string;
    name: string;
    url: string;
    icon: string;
}

interface SocialLinkMap {
    [key: string]: string;
}

const useSocialLinks = () => {
    const [socialLinks, setSocialLinks] = React.useState<ISocialLink[]>([]);
    const prefix = '/social-links';

    useEffect(() => {
        axiosClient.get(prefix)
            .then(res => {
                setSocialLinks(res.data.data);
            })
            .catch(err => {
                console.error('Error fetching social links:', err);
            });
    }, []);

    const updateSocialLink = async (data: ISocialLink[] = socialLinks): Promise<void> => {
        const newSocialLinks = convertDataToMap(data);
        await axiosClient.put(prefix, newSocialLinks)
            .then(res => {
                setSocialLinks(res.data.data);
            })
            .catch(err => {
                console.error('Error updating social links:', err);
            });
    };

    const convertDataToMap = (data: ISocialLink[]): SocialLinkMap => {
        const resultMap: SocialLinkMap = {};
        data.forEach((obj: ISocialLink) => {
            resultMap[obj.name] = obj.url;
        });
        return resultMap;
    };

    return { socialLinks, setSocialLinks, updateSocialLink };
};

export default useSocialLinks;

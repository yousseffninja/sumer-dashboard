import axiosClient from '@/configs/axios-client'
import { useEffect, useState } from 'react'

const useTermsConditions = () => {

    const getPrefix = '/static-data/terms-and-conditions'
    const putPrefix = '/static-data/'

    const [termsConditions, setTermsConditions] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axiosClient.get(getPrefix)
            .then(res => {
                const { description } = res.data.data.value
                setTermsConditions(description)
            })
            .catch(err => {
                console.error('Error fetching privacy policy:', err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    const updateTermsConditions = async (data: {}[] = termsConditions) => {
        await axiosClient.put(putPrefix, createJSONTemplate(data))
            .then(res => {
                setTermsConditions(res.data.data)
            })
            .catch(err => {
                console.error('Error updating privacy policy:', err)
                return Promise.reject(err)
            })
            .finally(() => {
                return Promise.resolve()
            })
    }

    const createJSONTemplate = (data: {}[]) => {
        return {
            "name": "terms-and-conditions",
            "value": {
                "title": {
                    "ar": "الشروط والأحكام",
                    "en": "Terms and Conditions"
                },
                "description": [
                    ...data
                ]
            }

        }
    }
    return { termsConditions, setTermsConditions, updateTermsConditions, isLoading }

}

export default useTermsConditions
import { IShippingOrderSettings } from '@/@types/shopping-order-settings'
import axiosClient from '@/configs/axios-client'
import { useEffect, useState } from 'react'
import useAlert from './use-alert'

const useShippingOrderSettings = () => {

    const prefix = '/shipping-order-settings'

    const { showAlert, renderForAlert } = useAlert()

    const [shippingOrderSettings, setShippingOrderSettings] = useState<IShippingOrderSettings>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axiosClient.get(prefix)
            .then(res => setShippingOrderSettings(res.data.data))
            .catch(err => {
                console.error('Error fetching privacy policy:', err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    const updateShippingOrderSettings = async () => {
        await axiosClient.post(prefix, shippingOrderSettings)
            .then(res => {
                setShippingOrderSettings(res.data.data)
                showAlert('Shipping order settings updated', 'success')
            })
            .catch(err => {
                console.error('Error updating shipping order settings:', err)
                showAlert('Error updating shipping order settings', 'error')
                return Promise.reject(err)
            })
            .finally(() => {
                return Promise.resolve()
            })
    }


    return { shippingOrderSettings, setShippingOrderSettings, updateShippingOrderSettings, isLoading, showAlert, renderForAlert }

}

export default useShippingOrderSettings
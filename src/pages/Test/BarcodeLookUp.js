import { axiosSecure, axiosPublic } from '@/config/axiosInstance';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true,
});

export default async function BarcodeLookup(barcode) {
    try {
        const result = await axiosSecure.get(`/api/barcode-loook-up/c/${barcode}`);
        console.log(result.data?.data);
        const data = result.data.data;
        return data;
    } catch (e) {
        notyf.error(e.response.data.message);
    }
}

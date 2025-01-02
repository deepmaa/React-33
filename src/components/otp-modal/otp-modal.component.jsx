import { Button, Modal } from "flowbite-react"
import { useState } from "react"
import authSvc from "../../pages/auth/auth.servive"
import { toast } from "react-toastify"
import { NavLink, useNavigate } from "react-router-dom";
import { CountdonwTimer } from "../counter/time.counter.component";

export const OTPModal = ({ otpModal = false, setOtpModal, email }) => {
    const [otp, setOtp] = useState()
    const navigate = useNavigate()
    const [errmsg, setErrMsg] = useState();
    const [timer, setTimer] = useState(1)

    const activateUser = async (e) => {
        try {
            e.preventDefault()

            const payload = {
                email: email,
                otp: otp
            }
            const response = await authSvc.activateUsingOTP(payload)
            toast.success("Your account has been activated")
            navigate("/login")
        } catch (exception) {
            if (exception.status === 410) {
                setErrMsg("Otp Code Expired")
            } else {
                toast.error("Cannot activate your account. Please check your email or your otp code")
            }
        }
    }

    const resendOtp = async (e) => {
        e.preventDefault()
        try {

            const response = await authSvc.resendOTP({
                email: email
            })
            setErrMsg('');
            setTimer(1)
        } catch (exception) {

        }
    }


    return (
        <Modal show={otpModal} onClose={() => setOtpModal(false)}>
            <Modal.Header>Activate using OTP</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <input
                        type={'text'}
                        onChange={(e) => {
                            setOtp(e.target.value)
                        }}
                        className={`
                                bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none`}
                        placeholder={'Enter your OTP code'}
                    />
                </div>
                {
                    errmsg ? <span className="text-red-600 text-xs">
                        {errmsg} <NavLink onClick={resendOtp} className={'text-teal-800 hover:cursor-pointer'} to={'/'}>Resend?</NavLink>
                    </span> : <span className="text-black text-xs dark:text-white">Resend otp code after <CountdonwTimer minutes={timer} /></span>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={activateUser}>Activate</Button>
                <Button color="red" onClick={() => setOtpModal(false)}>
                    Decline
                </Button>
            </Modal.Footer>
        </Modal>
    )
}


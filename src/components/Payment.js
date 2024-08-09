
import { useParams } from "react-router-dom";
import axios from "../config/axios";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap"; // Ensure correct imports
import { useEffect, useState } from "react";
import '../App.css';

export default function Payment() {
    const [request, setRequest] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null); // State to track payment status
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            try {
                const requestOneResponse = await axios.get(`/showOnerequest/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                setRequest(requestOneResponse.data);
                checkPaymentStatus(requestOneResponse.data.cid); // Check initial payment status
            } catch (e) {
                console.log(e);
            }
        })();
    }, [id]);

    const checkPaymentStatus = async (cid) => {
        try {
            const response = await axios.get(`/payment/status/${cid}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            console.log('Payment status:', response.data.paymentStatus);
            setPaymentStatus(response.data.paymentStatus); // Update payment status
        } catch (e) {
            console.log(e);
        }
    };

    const makePayment = async (ele) => {
        try {
            const body = {
                cid: ele.cid,
                secretCode: ele.secretCode,
                oprice: ele.oprice,
            };

            const response = await axios.post("/payment/pay", body);
            localStorage.setItem("stripeId", response.data.id); 
            window.location = response.data.url;  // Redirect to Stripe Checkout
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="payment-container">
            <h3>Payment Details</h3>
            {request ? (
                <div className="payment-card">
                    <Card>
                        <CardBody>
                            <CardTitle className="payment-card-title">{request.secretCode}</CardTitle>
                            <CardText className="payment-card-text">${request.oprice}</CardText>
                            <Button
                                className="payment-button"
                                onClick={() => makePayment(request)}
                                disabled={paymentStatus === 'successfully'} // Disable if payment is successful
                            >
                                {paymentStatus === 'successfully' ? 'Payment Completed' : 'Pay Now'}
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            ) : (
                <p>No requests available</p>
            )}
        </div>
    );
}

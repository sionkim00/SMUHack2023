import { sendMail } from "./mailService";


const handler = async (req, res) => {
    try {
        await sendMail (
            "TEST",
            "jonathanle1111@gmail.com",
            "Please work. Please work!"
        );
        res.status(200).send("Success");

    } catch(error)
    {
        res.status(400).json({
            error_code:"api_error",
            message: error.message
        })
    }



}

export default handler;
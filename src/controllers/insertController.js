import * as insertService from "../services/insertService.js";

export const insert = async (req, res) => {
    try {
        const response = await insertService.insertService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            msg: "Error from server"
        });
    }
}
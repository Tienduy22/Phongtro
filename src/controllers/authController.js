import * as authService from '../services/authService.js';

export const register = async (req, res) => {
    const {name, phone, password} = req.body;

    try {
        if(!name || !phone || !password) {  
            return res.status(400).json({ 
                message: 'All fields are required' 
            });
        }

        const response = await authService.registerService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ 
            message: 'Server error' + error.message
        });
    }
}

export const login = async (req, res) => {
    const {phone, password} = req.body;

    try {
        if(!phone || !password) {  
            return res.status(400).json({ 
                message: 'All fields are required' 
            });
        }

        const reponse = await authService.loginService(req.body);
        return res.status(200).json(reponse);
    } catch (error) {
        res.status(500).json({ 
            message: 'Server error' + error.message
        });
    }
}
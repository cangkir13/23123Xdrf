const axios = require('axios');

module.exports = async (req, res, next) => {
    const token = req.body.token;
    let token_production ='cb94fd1e8b60b8e873ff9ba386747fad6955d445ca1ad9e05de391d1e258e563d9516863e01e710c0f37d0ec8a70fa45ae8d51bf43d83fa6151abcf4c5267b62ltcCLRBuFJccH9U8ar0eaJbbVpli8BuyXBJq280w'
    if (token == token_production) {
        return next();
    }else{
        const url = "https://k-link.me/cek_token/"+token
        var verify = await axios({
            method:'GET',
            url,
        })
        
        
        if(verify.data.status == false) return res.status(401).json({erro:true, note:"Token is not verify"})
        return next();
    }
    
}

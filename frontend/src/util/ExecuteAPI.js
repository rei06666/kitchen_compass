const ExecuteAPI = async (params, method, headers, body, path) => {
    try {
        if (method=="GET") {
            const response = await fetch(`${process.env.REACT_APP_API_PATH}`+ path + '?' + params, {
                method: method,
                headers: headers,
            })
            return response
        } else if (method=="DELETE" || "POST"){
            const response = await fetch(`${process.env.REACT_APP_API_PATH}` + path, {
                method: method,
                headers: headers,
                body: body
            })
            return response
        }
    }
    catch (error){
        throw new Error
    }
}

export default ExecuteAPI
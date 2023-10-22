import requestIp from "request-ip";

export const getUserIpAddress = (req) => {
    return req.clientIp;
}
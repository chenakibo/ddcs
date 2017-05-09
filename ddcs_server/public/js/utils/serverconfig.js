var webProtocol = window.location.protocol;
var serverAddress = window.location.host || "127.0.0.1:11111";
if(webProtocol == "https:")
{
    serverAddress = "https://"+ serverAddress;
}
else
{
    serverAddress = "http://"+ serverAddress;
}
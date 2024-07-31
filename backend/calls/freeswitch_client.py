try:
    from freeswitchESL import ESL
except ImportError:
    ESL = None
    print("ESL module is not available")

class FreeswitchClient:
    def __init__(self, server_ip, server_port, password):
        print("========= freeswitch =========", server_ip, server_port, password)
        self.connection = ESL.ESLconnection(server_ip, server_port, password)
        print("========= freeswitch2 =========", self.connection)
        if not self.connection.connected():        
            print("========= freeswitch4 =========")
            raise Exception("Could not connect to FreeSWITCH")
        print("========= freeswitch3 =========")

    def make_call(self, from_phonenumber, to_phonenumber):
        command = f"originate sofia/gateway/mygateway/{to_phonenumber} &bridge(sofia/internal/{from_phonenumber}@mydomain)"
        response = self.connection.api(command)
        if response.getHeader("Reply-Text") != "+OK":
            raise Exception(response.getBody())
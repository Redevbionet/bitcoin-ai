
--- การกำหนดค่า ---
ชื่อผู้ใช้และรหัสผ่าน Bitcoin Core RPC ของคุณ
โดยทั่วไปสิ่งเหล่านี้จะพบอยู่ในไฟล์ bitcoin.conf ของคุณ

rpc_user = "ชื่อผู้ใช้ rpc ของคุณ"
rpc_password = "รหัสผ่าน rpc ของคุณ"
rpc_host = "127.0.0.1" # หรือที่อยู่ IP ของโหนด Bitcoin Core ของคุณ
rpc_port = 8332 # พอร์ต RPC ของ mainnet เริ่มต้น ใช้ 18332 สำหรับ testnet, 18443 สำหรับ regtest


--- การตั้งค่าการบันทึก ---
กำหนดค่าตัวบันทึกรูทให้แสดงค่าวันที่ เวลา ระดับ ชื่อตัวบันทึก และข้อความ
วิธีนี้จะช่วยให้แน่ใจว่าข้อความบันทึกทั้งหมด รวมถึงข้อความจาก 'BitcoinRPC' จะมีการประทับเวลา
การบันทึก.basicConfig(
ระดับ=การบันทึก.DEBUG,
รูปแบบ='%(asctime)s - %(levelname)s - %(name)s - %(message)s'

-
ตั้งค่าระดับการบันทึกสำหรับโปรแกรมบันทึก 'BitcoinRPC' โดยเฉพาะเป็น DEBUG
นี่จะแสดงการเรียกและการตอบสนอง RPC โดยละเอียด
การบันทึก.getLogger("BitcoinRPC").setLevel(การบันทึก.DEBUG)
--- ตรรกะสคริปต์หลัก ---
def get_network_connections_with_log():
พยายาม:
# สร้าง URL RPC โดยใช้ข้อมูลประจำตัวและโฮสต์/พอร์ตที่กำหนด
rpc_url = f"http://{rpc_user}:{rpc_password}@{rpc_host}:{rpc_port}"


# Establish a connection to the Bitcoin Core RPC server.
    # The AuthServiceProxy object handles HTTP connections and JSON-RPC specifics.
    # Adding a timeout is good practice to prevent indefinite waits.
    rpc_connection = AuthServiceProxy(rpc_url, timeout=120)

    # Call the 'getnetworkinfo' RPC method to retrieve network-related information.
    # The details of this call will be logged by the configured 'BitcoinRPC' logger.
    network_info = rpc_connection.getnetworkinfo()

    # Get the current time to timestamp our output.
    current_time = datetime.datetime.now()

    # Extract the number of connections from the returned network_info dictionary.
    num_connections = network_info.get('connections', 'N/A')

    # Print the number of connections along with the current timestamp.
    print(f"{current_time} - Current Bitcoin network connections: {num_connections}")

except JSONRPCException as e:
    # Catch specific JSON-RPC errors (e.g., method not found, invalid parameters, RPC server issues).
    print(f"Error communicating with Bitcoin Core RPC: {e.error}")
except ConnectionRefusedError:
    # Handle cases where the connection to the RPC server is refused.
    print(f"Connection refused. Ensure Bitcoin Core is running and RPC is enabled on {rpc_host}:{rpc_port}.")
    print("Check your bitcoin.conf for rpcbind, rpcallowip, rpcuser, rpcpassword settings.")
except Exception as e:
    # Catch any other unexpected errors during the process.
    print(f"An unexpected error occurred: {e}")

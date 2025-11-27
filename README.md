import datetime
import logging
from bitcoinrpc.authproxy import AuthServiceProxy, JSONRPCException
--- Configuration ---
Your Bitcoin Core RPC username and password.
These are typically found in your bitcoin.conf file.
rpc_user = "your_rpc_username"
rpc_password = "your_rpc_password"
rpc_host = "127.0.0.1" # Or the IP address of your Bitcoin Core node
rpc_port = 8332 # Default mainnet RPC port, use 18332 for testnet, 18443 for regtest
--- Logging Setup ---
Configure the root logger to display timestamps, level, logger name, and message.
This ensures that all log messages, including those from 'BitcoinRPC', have timestamps.
logging.basicConfig(
level=logging.DEBUG,
format='%(asctime)s - %(levelname)s - %(name)s - %(message)s'
)
Set the logging level specifically for the 'BitcoinRPC' logger to DEBUG.
This will show the detailed RPC calls and responses.
logging.getLogger("BitcoinRPC").setLevel(logging.DEBUG)
--- Main Script Logic ---
def get_network_connections_with_log():
try:
# Construct the RPC URL using the defined credentials and host/port.
rpc_url = f"http://{rpc_user}:{rpc_password}@{rpc_host}:{rpc_port}"


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

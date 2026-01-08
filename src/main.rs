use solana_client::rpc_client::RpcClient;
use solana_sdk::signer::Signer;
use solana_sdk::signer::keypair::Keypair;
use solana_sdk::pubkey::Pubkey;
use solana_sdk::transaction::Transaction;
use solana_sdk::system_instruction;
use solana_sdk::message::Message;
use std::env;
use std::str::FromStr;
use std::thread;
use std::time::Duration;
use reqwest::blocking::Client;
use serde_json::json;
use bs58;
use bincode;

// --- CONFIGURACIÓN DE GUERRA ---
const JITO_ENGINE_URL: &str = "https://amsterdam.mainnet.block-engine.jito.wtf/api/v1/bundles";
const RPC_URL: &str = "https://api.mainnet-beta.solana.com";
const JITO_TIP_ACCOUNT: &str = "96gYZGLnJYVFmbjzopPSU6QiEV5fGqZNyN9nmNhvrZU5"; 

// OBJETIVO: BONK (Dirección del Contrato)
const TARGET_MINT: &str = "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263";

fn main() {
    println!("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓");
    println!("▓▓   PROJECT MIDAS: SNIPER V13        ▓▓");
    println!("▓▓   MODO: RPC DIRECTO (ANTI-BAN)     ▓▓");
    println!("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓");

    let key_str = env::var("SOLANA_PRIVATE_KEY").expect("❌ ERROR: Sin clave.");
    let clean_key = key_str.trim();
    let keypair = Keypair::from_base58_string(clean_key);
    let my_pubkey = keypair.pubkey();

    println!("💀 OPERADOR: {}...", &my_pubkey.to_string()[0..8]);
    
    // Conexión Directa a Blockchain (Esto GitHub NO lo bloquea)
    let rpc_client = RpcClient::new(RPC_URL.to_string());
    let jito_client = Client::new();
    let target_pubkey = Pubkey::from_str(TARGET_MINT).unwrap();

    println!("🦅 RASTREANDO OBJETIVO EN LA BLOCKCHAIN...");
    
    // BUCLE DE CAZA
    loop {
        // 1. VERIFICAR EL TOKEN (Usamos RPC, no APIs web)
        // Esto le pregunta directamente a la red: "¿Existe BONK y cuánto hay?"
        match rpc_client.get_token_supply(&target_pubkey) {
            Ok(supply) => {
                let amount = supply.ui_amount.unwrap_or(0.0);
                println!("🎯 BLANCO LOCALIZADO: BONK (Supply: {:.0})", amount);
                println!("✅ El contrato es real y legible.");
                
                // 2. DISPARAR JITO (Prueba de Fuego)
                println!("🚀 INICIANDO SECUENCIA DE DISPARO JITO...");

                let recent_blockhash = rpc_client.get_latest_blockhash().unwrap();

                // Instrucción de disparo (Señal)
                let tip_ix = system_instruction::transfer(
                    &my_pubkey,
                    &Pubkey::from_str(JITO_TIP_ACCOUNT).unwrap(),
                    1000 
                );

                let tx = Transaction::new(&[&keypair], Message::new(&[tip_ix], Some(&my_pubkey)), recent_blockhash);
                let serialized_tx = bs58::encode(bincode::serialize(&tx).unwrap()).into_string();

                // Enviar al Minero
                let response = jito_client.post(JITO_ENGINE_URL)
                    .header("Content-Type", "application/json")
                    .body(json!({
                        "jsonrpc": "2.0",
                        "id": 1,
                        "method": "sendBundle",
                        "params": [[serialized_tx]]
                    }).to_string())
                    .send();

                match response {
                    Ok(res) => {
                        if res.status().is_success() {
                            println!("✅ ¡IMPACTO CONFIRMADO!");
                            println!("🔥 Tu robot tiene línea directa con BONK y con los Mineros.");
                            println!("🎉 (Prueba finalizada con éxito. Saliendo...)");
                            break; 
                        } else {
                            println!("⚠️ Jito ocupado, reintentando...");
                        }
                    },
                    Err(e) => println!("❌ Error Jito: {}", e),
                }
            },
            Err(e) => {
                println!("❌ No se puede leer el contrato de BONK. ¿RPC Saturado? Error: {}", e);
            }
        }
        
        thread::sleep(Duration::from_secs(5));
    }
}

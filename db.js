import mongoose from "mongoose"

const { set, connect: _connect, connection } = mongoose

export async function connect(DB_HOST) {
  try {
    set("strictQuery", false)
    set("useNewUrlParser", true)
    set("useFindAndModify", false)
    set("useCreateIndex", true)
    set("autoIndex", true)
    set("useUnifiedTopology", true)

 
    await _connect(DB_HOST, {
      serverSelectionTimeoutMS: 5000, 
      socketTimeoutMS: 45000, 
      family: 4, 
    })

    console.log(`✅ MongoDB Connected: ${connection.host}`)

    
    connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err)
    })

    
    connection.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected")
    })
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message)
    console.error("Full error:", err)
    process.exit(1)
  }
}
export async function close() {
  try {
    await connection.close()
    console.log("MongoDB connection closed")
  } catch (err) {
    console.error("Error closing MongoDB:", err)
  }
}

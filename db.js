import { set, connect as _connect, connection } from "mongoose"

export async function connect(DB_HOST) {
  try {
    // Set mongoose options
    set("strictQuery", false) // Important for Mongoose 7+
    set("useNewUrlParser", true)
    set("useFindAndModify", false)
    set("useCreateIndex", true)
    set("autoIndex", true)
    set("useUnifiedTopology", true)

    // Connect with options
    await _connect(DB_HOST, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    })

    console.log(`✅ MongoDB Connected: ${connection.host}`)

    // Error event listener (for after initial connection)
    connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err)
    })

    // Disconnected event
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

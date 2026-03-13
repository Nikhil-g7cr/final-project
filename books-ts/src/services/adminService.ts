export const getUnapprovedBooks = async () => {
    const res = await fetch("/admin/books")

    if (!res.ok) {
        throw new Error("Failed to fetch books")
    }

    return res.json()
}

export const approveBook = async (id:any) => {

    const res = await fetch("/admin/books", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
    })

    if (!res.ok) {
        throw new Error("Failed to approve book")
    }

    return res.json()
}
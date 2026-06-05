const API_URL = 'http://31.177.82.234:3000/api/transactions'

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3ODA1MjkxMjMsImV4cCI6MTc4MDYxNTUyM30.nT2zIDMmGb1G4av7kZkiaVEquMObwsURnNKmkmnznfI'

// 👇 подставь реальные categoryId (у тебя 2–6 есть)
const CATEGORY_IDS = [2, 3, 4, 5, 6]

type Transaction = {
  categoryId: number
  amount: number // ⚠️ ВАЖНО: было amount
  transactionType: 'income' | 'expense'
  description: string
  createdAt: string
}

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomType(): 'income' | 'expense' {
  return Math.random() > 0.5 ? 'income' : 'expense'
}

function randomCategory() {
  return CATEGORY_IDS[random(0, CATEGORY_IDS.length - 1)]
}

function formatDate(date: Date) {
  return date.toISOString()
}

// 👉 генерим весь 2024 год
function generateTransactions(): Transaction[] {
  const result: Transaction[] = []

  const start = new Date('2024-01-01')
  const end = new Date('2024-12-31')

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const txPerDay = random(1, 3)

    for (let i = 0; i < txPerDay; i++) {
      result.push({
        categoryId: randomCategory(),
        amount: random(10, 500), // 👈 сумма
        transactionType: randomType(),
        description: `Auto seed ${d.toDateString()}`,
        createdAt: formatDate(new Date(d)),
      })
    }
  }

  return result
}

async function createTransaction(tx: Transaction) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(tx),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`${res.status} ${error}`)
  }

  return res.json()
}

// 👇 чтобы не убить сервер — отправляем пачками
async function seed() {
  console.log('Seeding started...')

  const transactions = generateTransactions()

  console.log(`Generated: ${transactions.length} transactions`)

  const batchSize = 20

  for (let i = 0; i < transactions.length; i += batchSize) {
    const batch = transactions.slice(i, i + batchSize)

    await Promise.all(
      batch.map((tx) =>
        createTransaction(tx)
          .then((r) => console.log('Created:', r.id ?? r))
          .catch((e) => console.error('Error:', e.message))
      )
    )
  }

  console.log('Seeding finished')
}

seed()
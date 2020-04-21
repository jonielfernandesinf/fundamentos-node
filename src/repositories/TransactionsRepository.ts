import Transaction from '../models/Transaction';

interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): BalanceDTO {
    const income = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((prevVal, elemen) => {
        return prevVal + elemen.value;
      }, 0);

    const outcome = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((prevVal, elemen) => {
        return prevVal + elemen.value;
      }, 0);

    const total = income - outcome;

    const balance: BalanceDTO = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

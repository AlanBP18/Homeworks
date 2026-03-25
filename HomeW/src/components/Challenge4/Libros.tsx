

export class Libro {

    public isbn: number;
    public titulo: string;
    public autor: string;
    public editorial: string;

    constructor(isbn: number, titulo: string, autor: string, editorial: string) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.editorial = editorial
    }

    static crear(isbn: number, titulo: string, autor: string, editorial: string): Libro {
        return new Libro(isbn, titulo, autor, editorial);
    }
}
export default Libro
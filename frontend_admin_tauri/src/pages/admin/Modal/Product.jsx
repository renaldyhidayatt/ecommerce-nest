export default function ModalProduct() {
    return (
        <div
            className="modal fade text-left"
            id="product"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="product"
            aria-hidden="true"
        >
            <div
                className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
                role="document"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="product">
                            Add Kategori
                        </h4>
                        <button
                            type="button"
                            className="close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            <i data-feather="x" />
                        </button>
                    </div>
                    <form
                        action="<?= base_url('admin/product'); ?>"
                        method="POST"
                        encType="multipart/form-data"
                    >
                        <div className="modal-body">
                            <label htmlFor="name_produk">Nama Produk: </label>
                            <div className="form-group">
                                <input
                                    id="name_produk"
                                    type="text"
                                    name="name"
                                    placeholder="Nama Produk"
                                    className="form-control"
                                />
                            </div>
                            <label htmlFor="image">Gambar: </label>
                            <div className="form-group">
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    name="image"
                                />
                            </div>
                            <label htmlFor="category_id">ID Kategori: </label>
                            <div className="form-group">
                                <select name="category_id" className="form-control">
                                    <option value="">Pilih Kategori</option>
                                    {/*?php foreach ($category as $k) { ?*/}
                                    <option value="<?= $k->category_id;?>">
                                        {/*?= $k-*/}nama_kategori;?&gt;
                                    </option>
                                    {/*?php } ?*/}
                                </select>
                            </div>
                            <label htmlFor="description">Deskripsi: </label>
                            <div className="form-group">
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Deskripsi"
                                    className="form-control"
                                    defaultValue={""}
                                />
                            </div>
                            <label htmlFor="price">Harga: </label>
                            <div className="form-group">
                                <input
                                    id="price"
                                    type="text"
                                    name="price"
                                    placeholder="Harga"
                                    className="form-control"
                                />
                            </div>
                            <label htmlFor="countInStock">Jumlah Stok: </label>
                            <div className="form-group">
                                <input
                                    id="countInStock"
                                    type="text"
                                    name="countInStock"
                                    placeholder="Jumlah Stok"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-light-secondary"
                                data-bs-dismiss="modal"
                            >
                                <i className="bx bx-x d-block d-sm-none" />
                                <span className="d-none d-sm-block">Close</span>
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary ms-1"
                                data-bs-dismiss="modal"
                            >
                                <i className="bx bx-check d-block d-sm-none" />
                                <span className="d-none d-sm-block">Adding</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
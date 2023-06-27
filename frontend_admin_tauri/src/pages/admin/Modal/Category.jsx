export default function ModalCategory() {
    return (
        <div
            className="modal fade text-left"
            id="category"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="category"
            aria-hidden="true"
        >
            <div
                className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
                role="document"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="category">
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
                        action="<?= base_url('admin/category'); ?>"
                        method="POST"
                        encType="multipart/form-data"
                    >
                        <div className="modal-body">
                            <label htmlFor="name_kategori">Nama Kategori: </label>
                            <div className="form-group">
                                <input
                                    id="name_kategori"
                                    type="text"
                                    name="nama_kategori"
                                    placeholder="Nama Kategori"
                                    className="form-control"
                                />
                            </div>
                            <label htmlFor="image">image: </label>
                            <div className="form-group">
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    name="image"
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

export default function ModalRole() {
    return (
        <div class="modal fade text-left" id="role" tabindex="-1" role="dialog" aria-labelledby="role" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="role">
                            Add Role
                        </h4>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <i data-feather="x"></i>
                        </button>
                    </div>
                    <form action="<?= base_url('admin/role'); ?>" method="POST">
                        <div class="modal-body">
                            <label for="role">Nama Role: </label>
                            <div class="form-group">
                                <input id="role" type="text" name="role" placeholder="Nama Role" class="form-control" />
                            </div>


                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light-secondary" data-bs-dismiss="modal">
                                <i class="bx bx-x d-block d-sm-none"></i>
                                <span class="d-none d-sm-block">Close</span>
                            </button>
                            <button type="submit" class="btn btn-primary ms-1" data-bs-dismiss="modal">
                                <i class="bx bx-check d-block d-sm-none"></i>
                                <span class="d-none d-sm-block">Adding</span>
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const auth = useSelector((state) => state.auth);

  const { loading, error, user } = auth;
  

  return (
    <div className="max-w-screen-xl mx-auto mt-10">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="max-w-xs mx-auto lg:col-span-1">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex">
                  <div className="w-1/3 lg:w-2/5">
                    <img
                      src="<?= base_url('assets/img/upload/profile/') . $image; ?>"
                      className="w-full h-auto"
                      alt="Profile Picture"
                    />
                  </div>
                  <div className="w-2/3 lg:w-3/5 p-4">
                    <h5 className="text-xl font-semibold mb-2">
                      {/*?= $firstname . " " . $lastname; ?*/}
                    </h5>
                    <p className="text-gray-600">{/*?= $email; ?*/}</p>
                    <p className="text-sm text-gray-400 mt-4">
                      Jadi member sejak: <br />
                      <b className="italic">
                        {/*?= date('d F Y', strtotime($created_at)); ?*/}
                      </b>
                    </p>
                  </div>
                </div>
                <div className="flex justify-end px-4 py-2">
                  <a
                    href="<?= base_url('member/ubahProfile'); ?>"
                    className="btn btn-info"
                  >
                    <span className="text-gray">
                      <i className="fas fa-user-edit" /> Ubah Profil
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

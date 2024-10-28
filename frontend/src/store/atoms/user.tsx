import { atom, selector } from "recoil";
import { BACKEND_URL } from "../../config";
import axios from "axios";



export const userAtom = atom({
    key: "userAtom",
    default: selector({
        key: "userSelector",
        get: async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/v1/user/isAuth`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                });

                if (res.data.decoded && res.data.decoded.name) {
                    return res.data.decoded.name;
                }

                return "Anonymous";
            } catch (error) {
                console.error("Error fetching user:", error);
                return "Anonymous";
            }
        }
    })
})
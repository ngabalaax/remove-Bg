import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from 'axios';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const Daliog = () => {

    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    const [oldImage, setOldImage] = useState(null);
    const [newImage, setNewImage] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleImageChange = (event) => {
        setOldImage(null);
        setNewImage(null);

        const file = event.target.files[0];
        setImage(URL.createObjectURL(file));
        setFile(file);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("image", file);

            const { data } = await axios.post('/api/remove_bg', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setOldImage(data.oldUrl);
            setNewImage(data.newurl);

            console.log('Response:', data);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await axios({
                url: newImage,
                method: "GET",
                responseType: "blob"
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            link.setAttribute('download', 'download_image.png');

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('download', error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-md bg-indigo-600 py-2.5 text-lg px-6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Get Started
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl text-center border-b-2 border-indigo-400 pb-4">Register</DialogTitle>
                    <DialogDescription>
                        Registering is quick and easy. Just fill out the form below with your details to get started.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input type="file" placeholder="enter" onChange={handleImageChange} />
                    {image && !oldImage && <img src={image} style={{ maxWidth: "100%", margin: "10px" }} alt="Selected" />}
                </div>

                <Button
                    disabled={loading}
                    className={`rounded-md bg-indigo-600 py-2.5 text-sm px-6 font-semibold text-white shadow-sm 
                             hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                              focus-visible:outline-indigo-600 disabled:cursor-not-allowed`}
                    onClick={handleSubmit}
                >
                    {loading ? "Removing-Background" : "Remove-Background"}
                </Button>
                {oldImage && newImage && (
                    <div style={{ marginTop: "20px" }}>
                        <ReactCompareSlider
                            itemOne={<ReactCompareSliderImage src={newImage} alt="Old Image" />}
                            itemTwo={<ReactCompareSliderImage src={oldImage} alt="New Image" />}
                        />
                    </div>
                )}

                {newImage && (
                    <Button onClick={handleDownload} className='mt-4 rounded-md bg-indigo-600 py-2.5 text-sm px-6 font-semibold text-white shadow-sm 
                    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                     focus-visible:outline-indigo-600'>
                        Dowload New Image
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default Daliog;

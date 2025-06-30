import React from 'react';

const PaymentPartners = () => {
    const paymentPartners = [
        {
            name: 'eSewa',
            logo: 'https://imgs.search.brave.com/DDtwoCB-Um4ZXmxVzCEatUBRhOYPPhdJuFDSbqFZJlg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS83MzIt/NzMyMDMxNV9lc2V3/YS1sb2dvLWhkLXBu/Zy1kb3dubG9hZC5w/bmc',
        },
        {
            name: 'Khalti',
            logo: 'https://imgs.search.brave.com/qnKnZpGdvRxCM-FIg0hMj148pEh1Ytkh8oe7dnFpJAk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bmljZXBuZy5jb20v/cG5nL2Z1bGwvOTc0/LTk3NDgyOTJfa2hh/bHRpLWRpZ2l0YWwt/d2FsbGV0LWxvZ28t/aGVhbHRoY3Jvd2Qu/cG5n',
        },
        {
            name: 'IME Pay',
            logo: 'https://imgs.search.brave.com/xmn_lb0srWAzNBjNwbNK_3vlki8XMrDZkhmMiZ5zMP0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hdmF0/YXJzLmdpdGh1YnVz/ZXJjb250ZW50LmNv/bS91LzI2Mzk5MDIz/P3Y9NA',
        },
        {
            name: 'Visa',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png',
        },
    ];

    return (
        <div className="bg-base-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h3 className="text-center text-sm font-medium text-gray-500 mb-4">
                    Our Payment Partners
                </h3>
                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
                    {paymentPartners.map((partner) => (
                        <div key={partner.name} className="flex items-center h-12">
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="h-full w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaymentPartners;
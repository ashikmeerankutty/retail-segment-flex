
    export interface IAvailableColor {
        available: boolean;
        color: string;
        colorSecondary: string;
    }

    export interface IAvailbleSize {
        size: string;
        available: boolean;
    }

    export interface IProduct {
        id: number;
        title: string;
        subTitle: string;
        imagePaths: string[];
        price: string;
        priceUnit: string;
        availableColors: IAvailableColor[];
        availbleSizes: IAvailbleSize[];
    }

    export interface IServerImageMetadata {
        name: string
        b64: string
    }


    export interface ICartItem {
        product:IProduct
        size: string
    }

    export interface ICartTotals {
        tax: number;
        shipping: number;
        total: number;
        subtotal: number;
      }
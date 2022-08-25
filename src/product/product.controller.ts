import { Body, Controller, Get, HttpStatus, Param, Post, Res, NotFoundException, Delete, Put } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService){}

    @Post('/create')
   async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
     const product =  await this.productService.createProduct(createProductDTO)
        res.status(HttpStatus.OK).json({
            "mesage": "Producto creado!!",
            product
        })
    }

    @Get('/')
    async allProduct(@Res() res){
        const products = await this.productService.getProducts();
        res.json({
            products
        })
        return products;
    }

    @Get(':id')
    async oneProduct(@Res() res, @Param('id') id){
       const product = await this.productService.getProduct(id);
       if (!product) throw new NotFoundException('producto no existe');
       return res.status(HttpStatus.OK).json(product)

    }

    @Delete('/delete/:productID')
    async deleteProduct(@Res() res, @Param('productID') productID){
        const product = await this.productService.deleteProduct(productID);
        if (!product) throw new NotFoundException('producto no existe');
        return res.status(HttpStatus.OK).json({
            "message": "Producto eliminado",
            product
        }); 
    }

    @Put('/update/:id')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Param('id') id){
        const updateProduct = await this.productService.updateProduct(id, createProductDTO);
        if (!updateProduct) throw new NotFoundException('producto no existe');
        return res.status(HttpStatus.OK).json({
            message: 'Producto actualizado',
            updateProduct
        });
    }

}

import { z } from "zod";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct } from "@/data/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createProductSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
});

type CreateProductSchema = z.infer<typeof createProductSchema>;

export function CreateProductDialog() {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onSuccess(data, variables, context) {
      const cached = queryClient.getQueryData(["products"]);
      console.log(cached);

      queryClient.setQueriesData(["products"], (data) => {
        return [
          ...data,
          {
            id: crypto.randomUUID(),
            name: variables.name,
            price: variables.price,
          },
        ];
      });
    },
  });

  async function handleCreateProduct(data: CreateProductSchema) {
    try {
      await createProductFn({
        name: data.name,
        price: data.price,
      });
      alert("Cadastrado com sucesso");
    } catch (err) {
      alert("Erro ao cadastrar produto");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo produto</DialogTitle>
        <DialogDescription>Criar um novo produto no sistema</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateProduct)} className="space-y-6">
        <div className="grid grid-cols-4 items-center gap-2 text-right">
          <Label htmlFor="name">Produto</Label>
          <Input className="col-span-3" {...register("name")} />
        </div>

        <div className="grid grid-cols-4 items-center gap-2 text-right">
          <Label htmlFor="price">Preço</Label>
          <Input className="col-span-3" {...register("price")} />
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

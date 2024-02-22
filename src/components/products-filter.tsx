import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";

const productsFilterSchema = z.object({
  id: z.string(),
  name: z.string(),
});

type ProductsFilterSchema = z.infer<typeof productsFilterSchema>;

export function ProductsFilter() {
  const [searchParams, setSearchParms] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const { register, handleSubmit } = useForm<ProductsFilterSchema>({
    resolver: zodResolver(productsFilterSchema),
    values: {
      id: id || "",
      name: name || "",
    },
  });

  function handleFilterProducts({ id, name }: ProductsFilterSchema) {
    console.log(id, name);

    setSearchParms((state) => {
      if (id) {
        state.set("id", id);
      } else {
        state.delete("id");
      }

      return state;
    });

    setSearchParms((state) => {
      if (name) {
        state.set("name", name);
      } else {
        state.delete("name");
      }

      return state;
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilterProducts)}
      className="flex items-center gap-2"
    >
      <Input placeholder="ID do pedido" {...register("id")} />
      <Input placeholder="Nome do produto" {...register("name")} />
      <Button type="submit" variant="link">
        <Search className="w-4 h-4 mr-2" />
        Filtrar resultados
      </Button>
    </form>
  );
}
